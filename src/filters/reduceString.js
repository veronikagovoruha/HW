export default function reduceString(value) {
    if (value.length > 500) {
        return value.substring(0, 500) + "..."
    }
    return value;
}
