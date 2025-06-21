import React from "react";

const SubmissionListTable = ({ submissions }) => {
  // Fonction pour formater la date
  const formatDate = (createdAt) => {
    if (!createdAt) return 'Date non disponible';
    
    let date;
    
    if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    }
    
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }
    
    // Formater en français
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // trie des soummisions du plus résent au plus ancien
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aSeconds = a.createdAt?.seconds || 0;
    const bSeconds = b.createdAt?.seconds || 0;
    return bSeconds - aSeconds; // ordre décroissant
  });

  return (
    <div className="overflow-x-auto">
      <table>
        <thead className="bg-gray-50">
          <tr>
            <th>
              Nom
            </th>
            <th>
              Date de soumission
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((item, index) => (
            <tr key={index}>
              <td>
                {item.firstName || 'N/A'} {item.lastName || 'N/A'}
              </td>
              <td>
                {formatDate(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {submissions.length === 0 && (
        <div>
          Aucune soumission trouvée
        </div>
      )}
    </div>
  );
};

export default SubmissionListTable;