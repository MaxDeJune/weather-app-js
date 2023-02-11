const moonPhases = (description) => {
    let moon = description.toLowerCase();
    if (moon == "new moon") 
    return `<div>${imageOfMoon(100, darkColor, lightColor)}</div>
            <p>Новолуние</p>`;
    else if (moon == "waxing crescent" || moon == "first quarter" || moon == "waxing gibbous") return `<div>${imageOfMoon(50, lightColor, darkColor)}</div>
            <p>Растущая луна</p>`;
    else if (moon == "full moon") 
    return `<div>${imageOfMoon(100, lightColor, darkColor)}</div>
            <p>Полнолуние</p>`; 
    else if (moon == "waning gibbous" || moon == "last quarter" || moon == "waning crescent") return `<div>${imageOfMoon(150, lightColor, darkColor)}</div>
            <p>Убывающая луна</p>`; 
    else return `<p>Луну пока не видно:(</p>`;  
}

const lightColor = "#e5e5e5"; 
const darkColor = "#8a7f8d";

const imageOfMoon = (x, color1, color2) => {
    return `<svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" clip-path="circle(49% at 50% 50%)">
        <circle cx="100" cy="100" r="97" fill="${color1}"/>
        <ellipse cx="${x}" cy="100" rx="97" ry="97" fill="${color2}" skewX(5) stroke-width="3"/>
        <circle cx="100" cy="100" r="97" stroke="#403F36" fill="transparent" stroke-width="3"/>
        <circle cx="50" cy="90" r="8" stroke="#403F36" fill="transparent" stroke-width="3"/>
        <circle cx="150" cy="20" r="10" stroke="#403F36" fill="transparent" stroke-width="3"/>
        <circle cx="160" cy="120" r="10" stroke="#403F36" fill="transparent" stroke-width="3"/>
    </svg>`;
    
}

export { moonPhases }; 