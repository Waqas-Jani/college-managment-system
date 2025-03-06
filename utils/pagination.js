const CustomError = require("./customErros");

const simplePagination = async (
  model,
  page,
  limit,
  query = {},
  populateOptions = [],
  sortBy,
  select
) => {
  try {
    const offset = (page - 1) * limit || 0;
    let sort = {};
    if (sortBy === "desc") {
      sort = { createdAt: -1 };
    } else {
      sort = { createdAt: 1 };
    }

    const totalDocuments = await model.countDocuments(query);

    let queryBuilder = model.find(query).skip(offset).sort(sort).limit(limit).lean();

    // Apply population if required
    if (populateOptions.length > 0) {
      //   populateOptions.forEach((field) => {
      //     queryBuilder = queryBuilder.populate(field);
      //   });
      queryBuilder = queryBuilder.populate(populateOptions);
    }
    if (select) {
      queryBuilder.select(select);
    }

    const results = await queryBuilder.exec();

    if (!limit && !page) {
      return {
        total_records: totalDocuments,
        results
      };
    }
    return {
      total_pages: Math.ceil(totalDocuments / limit),
      current_page: page,
      total_records: totalDocuments,
      results
    };
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const cursorPagination = async (
  model,
  query,
  cursor,
  limit,
  populateFields = [],
  sortField = "_id"
) => {
  try {
    // Convert limit to an integer with a default value
    limit = parseInt(limit) || 10;

    // Build query for cursor-based pagination
    const paginationQuery = cursor ? { ...query, [sortField]: { $gt: cursor } } : query;

    // Fetch data with population
    let queryExec = model
      .find(paginationQuery)
      .sort({ [sortField]: 1 }) // Sort in ascending order
      .limit(limit);

    // Apply population if fields are provided
    if (populateFields.length > 0) {
      populateFields.forEach((field) => (queryExec = queryExec.populate(field)));
    }

    // Execute query
    const results = await queryExec;

    // Get the next cursor (last item's sortField)
    const nextCursor = results.length ? results[results.length - 1][sortField] : null;

    return { results, nextCursor };
  } catch (error) {
    throw new CustomError("Pagination error: " + error.message, 400);
  }
};

module.exports = { simplePagination, cursorPagination };
