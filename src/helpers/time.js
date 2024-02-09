/* 
OPTIONS:

weekday: 'narrow' | 'short' | 'long',
era: 'narrow' | 'short' | 'long',
year: 'numeric' | '2-digit',
month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
day: 'numeric' | '2-digit',
hour: 'numeric' | '2-digit',
minute: 'numeric' | '2-digit',
second: 'numeric' | '2-digit',
timeZoneName: 'short' | 'long',

// Time zone to express it in
timeZone: 'Asia/Shanghai',
// Force 12-hour or 24-hour
hour12: true | false,

// Rarely-used options
hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
formatMatcher: 'basic' | 'best fit'
*/

export const getOption = (format) => {
  if (format === "MMYYYY" || format === "ddmm" || format === "dm") {
    return {
      month: "long",
      year: "numeric",
    }
  }
  if (format === "MM-YYYY" || format === "d-m") {
    return {
      month: "numeric",
      year: "numeric",
    }
  }
  if (format === "ddMMYYYY" || format === "LL") {
    return {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  }
  if (format === "ddMMYYYY" || format === "dMY") {
    return {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  }
  if (format === "DD/MM/YYYY HH:mm") {
    return {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  }
  if (format === "DD/MM/YYYY HH:mm" || format === "LLL") {
    return {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  }
}

export const formatDate = (lang = "en-GB", format, dateString) => {
  if (!dateString) return "";
  const hasDash = format.includes("-");
  const locale = lang === "en" ? "en-GB" : lang
  const options = getOption(format);
  const date = new Date(dateString);
  return hasDash ? Intl.DateTimeFormat(locale, options).format(date).replace("/", "-") : Intl.DateTimeFormat(locale, options).format(date)
}


