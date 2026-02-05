function pad2(n){ return n < 10 ? "0" + n : "" + n; }

function getTZFromURL(){
  const p = new URLSearchParams(window.location.search);
  return p.get("tz"); // ej: America/New_York
}

function updateTime(){
  const tz = getTZFromURL();

  // armamos partes con Intl para soportar timeZone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz || undefined,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).formatToParts(new Date());

  const get = (type) => parts.find(p => p.type === type)?.value ?? "";

  // hour ya viene en 2 dígitos en en-US con hour:"2-digit"
  document.getElementById("hours").textContent = get("hour");
  document.getElementById("minutes").textContent = get("minute");
  document.getElementById("seconds").textContent = get("second");
  document.getElementById("ampm").textContent = get("dayPeriod"); // AM/PM
}

updateTime();
setInterval(updateTime, 1000);
