import * as IMAGES from "../images.js"

export function getRouteImages() {
  const _sections = window.location.href.split("/");
  const pageRoute = _sections[_sections.length-1];
  switch (pageRoute) {
    case "remedify":
      return IMAGES.REMEDIFY_IMAGES;
    case "studius":
      return IMAGES.STUDIUS_IMAGES;
    case "designs":
      return IMAGES.DESIGNS;
    case "db-mag":
      return IMAGES.DB_IMAGES;
    case "graphic-design-commissions":
      return IMAGES.COMMISSIONS
    default:
      return IMAGES.ALL_IMAGES;
  }
}