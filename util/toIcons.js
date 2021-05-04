const toIcons = (num, icon) => {
    let icons = icon
    for (let i = 0; i < num; i++ ) {
        icons = icons + icon
    }
    return icons
}

export default toIcons 