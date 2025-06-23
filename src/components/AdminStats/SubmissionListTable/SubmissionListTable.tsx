import React from "react";

const SubmissionListTable = ({ submissions, onClick }) => {
  const formatDate = (createdAt) => {
    if (!createdAt) return 'Date non disponible';

    let date;

    if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    }

    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }

    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClick =(id) =>{
    if(onClick){
      onClick(id);
    }
  }

  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aSeconds = a.createdAt?.seconds || 0;
    const bSeconds = b.createdAt?.seconds || 0;
    return bSeconds - aSeconds;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>E-mail</th>
            <th>Date de soumission</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((item, index) => (
            <tr key={index}>
              <td>
                {item.firstName || 'N/A'} {item.lastName || 'N/A'}
              </td>
              <td>
                <button
                  onClick={() => handleClick(item.id)}
                >
                  {item.email || 'Email inconnu'}
                </button>
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