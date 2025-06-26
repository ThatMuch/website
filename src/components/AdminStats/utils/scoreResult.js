export function scoreResult(globalScore) {
  return result(globalScore, 66, 33);
}

export function sectionResul(section, score) {
  switch (section) {
    case "design":
    case "marketing":
    case "ux":
    case "performance":
    case "technique":
    case "legal":
      return result(score, 10, 5);
    case "seo":
      return result(score,6,3);
  }
}

function result(score, ok, warning) {
  if (score >= ok) {
    return "good";
  } else if (score >= warning) {
    return "medium";
  } else {
    return "low";
  }
}
