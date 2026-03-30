import { useEffect, useState } from 'react';

function Dashboard() {
  const [loading, setLoading] = useState(true);

  //! Dashboard Verileri
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);
  //! Dashboard Verileri -- Son

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="project-detail">
      {/* HEADER */}
      <div className="project-header">
        <div>
          <div className="center-wrapper">
            <h1>Dashboard</h1>
          </div>
          <p>Sistem genel istatistikleri</p>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="project-info-grid">
        <div className="info-card">
          <span>Tüm Kullanıcılar</span>
          <strong>0</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
