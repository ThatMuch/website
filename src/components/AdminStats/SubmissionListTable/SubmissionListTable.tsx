import React from "react";
import { categories } from "../utils/categoryIcons";
import { formatDate } from "../utils/dateUtils";
import { scoreResult } from "../utils/scoreResult";
import "./style.scss";

const SubmissionListTable = ({ submissions, onClick }) => {
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aSeconds = a.createdAt?.seconds || 0;
    const bSeconds = b.createdAt?.seconds || 0;
    return bSeconds - aSeconds;
  });

  if (submissions.length === 0) {
    return <div className="submission-table__empty">Aucune soumission trouvée</div>;
  }

  return (
    <div className="submission-table">
      <div className="submission-table__scroll-container">
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Date</th>
              {categories.map(({ key, label, icon }) => (
                <th key={key} className="submission-table__header-category">
                  <div className="submission-table__category-header">
                    {icon}
                    <span>{label}</span>
                  </div>
                </th>
              ))}
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.map((item) => (
              <tr key={item.id || item.email}>
                <td>
                  <button
                    onClick={() => onClick && onClick(item.id)}
                    className="submission-table__user-button"
                  >
                    <span className="submission-table__user-name">
                      {item.firstName} {item.lastName}
                    </span>
                    <span className="submission-table__user-email">
                      {item.email}
                    </span>
                  </button>
                </td>
                <td>{formatDate(item.createdAt)}</td>
                {categories.map(({ key }) => (
                  <td key={key} className="score">
                    {item.scores?.scoresByCategory?.[key] ?? "-"}
                  </td>
                ))}
                <td className="score">
                  <span className={`pastille ${scoreResult(item.scores.globalScore)}`}>
                    {item.scores.globalScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionListTable;