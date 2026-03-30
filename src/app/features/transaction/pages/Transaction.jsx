// apps/web/src/app/features/transaction/pages/Transaction.jsx
import TransactionTable from '../components/TransactionTable';

function Transaction() {
  const search = '';

  return (
    <>
      <div className="dashboard-header">
        <div
          className="table-title"
          style={{
            display: 'flex',
            width: '%100',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1>İşlemler </h1>
            <p className="dashboard-subtitle"> Sistemdeki Kayıtlı Olan İşlemler</p>
          </div>
        </div>
      </div>

      <TransactionTable search={search} />
    </>
  );
}

export default Transaction;
