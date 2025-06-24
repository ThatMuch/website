export function scoreResult(globalScore) {
  if (globalScore >= 66) {
    return "good";
  } else if (globalScore >= 33) {
    return "medium";
  } else {
    return "low";
  }
}
