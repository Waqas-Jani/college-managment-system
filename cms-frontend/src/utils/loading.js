import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
const Loading = ({ loading, styles }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: styles
        }}>
            <BounceLoader
                size={80}
                color={"#03a1fc"}
                loading={loading}
            />
        </div>
    )
}
export default React.memo(Loading);