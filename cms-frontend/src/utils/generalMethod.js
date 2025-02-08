export const getTime = (date) => {
    var sec = new Date(date);
    var hour = sec.getHours();
    var min = sec.getMinutes();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    min = min < 10 ? '0' + min : min;
    var time = hour + ':' + min + ' ' + ampm;
    return time
}