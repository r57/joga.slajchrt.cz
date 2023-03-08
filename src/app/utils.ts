import { DateTime } from "luxon";

/**
 * Attempt to sanitize phone string into E.164 format
 * @param phoneStr 
 * @returns 
 */
export function sanitizePhone(phoneStr: string): string {
  const cleanPhoneStr = phoneStr
    .replaceAll(/![+0-9]/g, "") // clean all whitespace, dashes etc.
    .replace(/^00/, "+"); // convert leading 00 to +

  // ensure country code, naively adding +420 if needed
  const cleanCountryCode = cleanPhoneStr.startsWith("+")
    ? cleanPhoneStr
    : "+420" + cleanPhoneStr;

  return cleanCountryCode;
}

export function dateFormatMedium(date: DateTime): string {
  return date.toFormat("EEE d.M. H:mm");
}