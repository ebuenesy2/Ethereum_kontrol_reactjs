// apps/web/src/app/features/transactions/components/transactionTable.jsx
import { useEffect, useState, useCallback } from 'react';
import { transactionApi } from '../../../api/transaction.api';
import { useSocket } from '@/app/providers/use-socket';
import Pagination from './Pagination';

function TransactionTable({ search }) {
  const [transactionLoding, settransactionLoding] = useState(true);
  const [transactions, settransactions] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('DESC');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sizeCount, setSizeCount] = useState(0);
  const [alarm, setAlarm] = useState('all');

  const [flashMap, setFlashMap] = useState({});

  const fetchtransactions = useCallback(async () => {
    try {
      settransactionLoding(true);

      const params = {
        page,
        limit,
        order,
        alarm,
      };

      let res_transaction = await transactionApi.list(params);
      let response = { data: null, meta: null };
      //console.log('res_transaction:', res_transaction);

      if (search) {
        res_transaction = await transactionApi.filtre(search);
      }

      response.data = res_transaction.rows;
      response.meta = res_transaction.meta;

      settransactions(response.data || []);
      setTotalPages(response?.meta?.pageCount || 1);
      setTotalCount(response?.meta?.total || 0);
      setSizeCount(response?.meta?.size || 0);
    } catch (error) {
      console.error('Transactionleri alınırken hata oluştu:', error);
    } finally {
      settransactionLoding(false);
    }
  }, [page, limit, order, alarm, search]);

  //Effect clean
  useEffect(() => {
    fetchtransactions();
  }, [fetchtransactions]);

  // Realtime
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;

    const handleCreated = (data) => {
      //console.log('Yeni transaction eklendi:', data);

      settransactions((prev) => {
        // aynı kayıt varsa tekrar ekleme (duplicate önleme)
        const exists = prev.some((p) => p.id === data.id);
        if (exists) return prev;

        const updated = [data, ...prev];

        // limit aşılırsa sondan kırp
        if (updated.length > limit) {
          updated.pop();
        }

        // flash animasyon
        setFlashMap((fm) => ({ ...fm, [data.id]: true }));
        setTimeout(() => {
          setFlashMap((fm) => ({ ...fm, [data.id]: false }));
        }, 2000);

        return updated;
      });

      // count güncelle
      setSizeCount((prev) => Math.min(prev + 1, limit));
      setTotalCount((prev) => prev + 1);
    };

    const handleUpdated = (data) => {
      console.log('Transaction güncellendi:', data);

      settransactions((prev) =>
        prev.map((p) => {
          if (p.id == data.id) {
            // flash animasyon
            setFlashMap((fm) => ({ ...fm, [data.id]: true }));
            setTimeout(() => {
              setFlashMap((fm) => ({ ...fm, [data.id]: false }));
            }, 2000);

            console.log('Güncellenen transaction:', data);

            return {
              ...p,
              totalScore: data.totalScore,
              triggeredAlarm: data.triggeredAlarm,
            };
          }
          return p;
        }),
      );
    };

    const handleDeleted = (data) => {
      console.log('Transaction silindi:', data);

      settransactions((prev) => {
        const updated = prev.filter((p) => p.id !== data.id);

        // flash efekt istersen önce gösterip sonra silebilirsin (opsiyonel)
        setFlashMap((fm) => ({
          ...fm,
          [data.id]: true,
        }));

        setTimeout(() => {
          setFlashMap((fm) => ({
            ...fm,
            [data.id]: false,
          }));
        }, 500);

        // count güncelle
        setSizeCount(updated.length);
        setTotalCount((prevTotal) => Math.max(prevTotal - 1, 0));

        return updated;
      });
    };

    socket.on('transaction:add', handleCreated);
    socket.on('transaction:update', handleUpdated);
    socket.on('transaction:delete', handleDeleted);

    return () => {
      socket.off('transaction:add', handleCreated);
      socket.off('transaction:update', handleUpdated);
      socket.off('transaction:delete', handleDeleted);
    };
  }, [socket, limit]);
  // Realtime

  // limit değişince sayfa 1'e dön
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // order değişince sayfa 1'e dön
  const handleOrderChange = (field) => {
    setOrder(field);
    setPage(1);
  };

  // alarm değişince sayfa 1'e dön
  const handleAlarmChange = (field) => {
    setAlarm(field);
    setPage(1);
    fetchtransactions();
  };

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <div className="toolbar-item">
          <label>
            Sayfa Başına:
            <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>

        <div className="toolbar-item">
          <label>
            Sayfa Sıralama:
            <select value={order} onChange={(e) => handleOrderChange(e.target.value)}>
              <option value={'ASC'}>ASC</option>
              <option value={'DESC'}>DESC</option>
            </select>
          </label>
        </div>

        <div className="toolbar-item">
          <label>
            Alarm:
            <select
              value={alarm}
              onChange={(e) => {
                handleAlarmChange(e.target.value);
              }}
            >
              <option value={'all'}>Hepsi</option>
              <option value={'1'}>Risk 1</option>
              <option value={'2'}>Risk 2</option>
              <option value={'3'}>Risk 3</option>
              <option value={'4'}>Risk 4</option>
            </select>
          </label>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kayıt Tarihi</th>
            <th>Müşteri</th>

            <th>Tür</th>
            <th>Tutar</th>
          </tr>
        </thead>

        <tbody>
          {transactionLoding ? (
            <tr>
              <td colSpan="3" className="muted">
                Yükleniyor...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="3" className="muted">
                Transactionler Bulunamadı
              </td>
            </tr>
          ) : (
            transactions.map((p) => (
              <tr key={p.id} className="table-row clickable">
                <td className={flashMap[p.id] ? 'flash' : ''}>{p.id}</td>
                <td className={flashMap[p.id] ? 'flash' : ''}>
                  {p.created_at ? new Date(p.created_at).toLocaleString('tr-TR') : '-'}
                </td>

                <td className={flashMap[p.id] ? 'flash' : ''}>
                  {p.customer_number} - {p.customer_name}
                </td>
                <td className={flashMap[p.id] ? 'flash' : ''}>{p.transaction_type}</td>
                <td className={flashMap[p.id] ? 'flash' : ''}>{p.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="total-count">
        Toplam:{' '}
        <b>
          {sizeCount} / {totalCount}
        </b>{' '}
        kayıt
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default TransactionTable;
