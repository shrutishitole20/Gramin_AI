
// import React, { useState, useEffect, useCallback } from 'react';
// import axiosInstance from '../api/axiosInstance';
// import './Certificates.css';

// const Certificates = () => {
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterDate, setFilterDate] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5); // Dynamic Pagination
//   const [selectedCert, setSelectedCert] = useState(null);
//   const [certBlobUrl, setCertBlobUrl] = useState(null);
//   const [certLoading, setCertLoading] = useState(false);
//   const [showSuccessToast, setShowSuccessToast] = useState(false);

//   const [highlightedEmails, setHighlightedEmails] = useState(new Set());
//   const [certifiedUsers, setCertifiedUsers] = useState([]);

//   // Metrics state mapped to your API structure
//   const [metrics, setMetrics] = useState({
//     total_users: 0,
//     successfully_sent: 0,
//     already_certified: 0,
//     failed: 0
//   });

//   // 1. Initial Data Load
//   const fetchRegistryData = useCallback(async (updateMetrics = true) => {
//     try {
//       if (updateMetrics) setLoading(true);
//       const [certRes, usersRes] = await Promise.all([
//         axiosInstance.get('app/certificate/'),
//         axiosInstance.get('app/users_list/')
//       ]);

//       const certData = certRes.data;
//       const usersData = Array.isArray(usersRes.data) ? usersRes.data : (usersRes.data.users || []);

//       // Update metrics from initial load if available
//       if (updateMetrics && certData.results) {
//         setMetrics(certData.results);
//       } else if (updateMetrics) {
//         // Fallback for different initial load structure
//         setMetrics(prev => ({
//           ...prev,
//           total_users: usersData.length,
//           already_certified: certData.already || 0
//         }));
//       }

//       const merged = (certData.pdf_urls || []).map((pdfItem) => {
//         const userDetail = usersData.find(u => u.email === pdfItem.user);
//         return {
//           id: pdfItem.url.split('uid=')[1] || 'N/A',
//           email: pdfItem.user,
//           pdf_url: pdfItem.url,
//           full_name: userDetail ? userDetail.full_name : 'Participant',
//           date: userDetail ? userDetail.date_joined.split(' ')[0] : 'N/A'
//         };
//       });

//       setCertifiedUsers(merged);
//     } catch (err) {
//       console.error("Sync Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchRegistryData(); }, [fetchRegistryData]);

//   // 2. Handle Distribution with NEW API Response Structure
//   const handleSendCertificates = async () => {
//     try {
//       setSending(true);
//       const response = await axiosInstance.get('app/certificate/');

//       if (response.data.status === "success") {
//         const resData = response.data.results;

//         // Update the Cards (Metrics) immediately from results
//         setMetrics({
//           total_users: resData.total_users,
//           successfully_sent: resData.successfully_sent,
//           already_certified: resData.already_certified,
//           failed: resData.failed
//         });

//         // Highlight users who were just processed (sent)
//         // If your API returns specifically who was sent in this batch, map them here:
//         const processedBatch = (response.data.pdf_urls || []).map(u => u.user);
//         setHighlightedEmails(new Set(processedBatch));

//         setShowSuccessToast(true);
//         setTimeout(() => setShowSuccessToast(false), 4000);
//         setTimeout(() => setHighlightedEmails(new Set()), 5000); // Remove highlight

//         await fetchRegistryData(false); // Refresh the table list
//       }
//     } catch (err) {
//       console.error("Distribution Error:", err);
//     } finally {
//       setSending(false);
//     }
//   };

//   // 3. Filtering & Pagination Logic
//   const filteredUsers = certifiedUsers.filter(u => {
//     const matchesSearch = u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDate = !filterDate || u.date === filterDate;
//     return matchesSearch && matchesDate;
//   });

//   const effectiveItemsPerPage = itemsPerPage === 'All' ? filteredUsers.length : parseInt(itemsPerPage);
//   const totalPages = Math.ceil(filteredUsers.length / (effectiveItemsPerPage || 1));
//   const currentItems = filteredUsers.slice((currentPage - 1) * effectiveItemsPerPage, currentPage * effectiveItemsPerPage);

//   useEffect(() => { setCurrentPage(1); }, [searchTerm, filterDate, itemsPerPage]);

//   // 4. PDF Blob Loader (Bypasses iframe blocks)
//   useEffect(() => {
//     let url = null;
//     if (selectedCert) {
//       setCertLoading(true);
//       axiosInstance.get(selectedCert.pdf_url, { responseType: 'blob' })
//         .then(res => {
//           url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
//           setCertBlobUrl(url);
//           setCertLoading(false);
//         }).catch(() => setCertLoading(false));
//     }
//     return () => { if (url) URL.revokeObjectURL(url); };
//   }, [selectedCert]);

//   return (
//     <div className="hq-admin-panel">
//       {showSuccessToast && (
//         <div className="hq-success-toast">
//           <div className="toast-icon">✓</div>
//           <div className="toast-content">
//             <h4>Success</h4>
//             <p>{metrics.successfully_sent} Certificates Distrubuted.</p>
//           </div>
//           <div className="toast-progress"></div>
//         </div>
//       )}

//       <div className="panel-container">
//         <header className="hq-header">
//           <div className="hq-brand">
//             <h1>Gramin AI <span className="hq-accent">Summit Registry</span></h1>
//           </div>
//           <div className="hq-tools">
//             <button className="hq-sync-btn" onClick={() => fetchRegistryData()}>Refresh</button>
//             <button className="trigger-btn" onClick={handleSendCertificates} disabled={sending}>
//               {sending ? 'Processing...' : 'Send Certificate'}
//             </button>
//           </div>
//         </header>

//         {/* Dynamic Metric Cards */}
//         <div className="hq-metrics-grid four-cols">
//           <div className="metric-box pool">
//             <div className="m-content">
//               <span className="m-label">Total Users</span>
//               <span className="m-value">{metrics.total_users}</span>
//             </div>
//           </div>
//           <div className="metric-box sent">
//             <div className="m-content">
//               <span className="m-label">Successfully Sent</span>
//               <span className="m-value">{metrics.successfully_sent}</span>
//             </div>
//           </div>
//           <div className="metric-box certified">
//             <div className="m-content">
//               <span className="m-label">Already Certified</span>
//               <span className="m-value">{metrics.already_certified}</span>
//             </div>
//           </div>
//           <div className="metric-box failures">
//             <div className="m-content">
//               <span className="m-label">Failed</span>
//               <span className="m-value">{metrics.failed}</span>
//             </div>
//           </div>
//         </div>

//         <div className="hq-workspace">
//           <div className="workspace-header">
//             <div className="hq-search">
//               <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//             </div>

//             <div className="hq-filters">
//               {/* Rows Pagination Selector */}
//               <select className="hq-row-select" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
//                 <option value={5}>Show 5</option>
//                 <option value={10}>Show 10</option>
//                 <option value={20}>Show 20</option>
//                 <option value="All">Show All</option>
//               </select>

//               {/* Calendar Filter */}
//               <input type="date" className="hq-date-input" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
//               {filterDate && <button className="clear-date" onClick={() => setFilterDate('')}>×</button>}
//             </div>
//           </div>

//           <div className="table-zone">
//             <table className="hq-table">
//               <thead>
//                 <tr>
//                   <th>Sr. No.</th>
//                   <th>ID</th>
//                   <th>Participant</th>
//                   <th>Date Joined</th>
//                   <th>Status</th>
//                   <th className="text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr><td colSpan="6" className="no-data-msg">Loading...</td></tr>
//                 ) : currentItems.map((u, i) => (
//                   <tr key={u.email} className={highlightedEmails.has(u.email) ? 'row-highlight-active' : ''}>
//                     <td>{((currentPage - 1) * effectiveItemsPerPage) + i + 1}</td>
//                     <td><code>#{u.id}</code></td>
//                     <td>
//                       <div className="participant-info">
//                         <span className="p-name">{u.full_name}</span>
//                         <span className="p-email">{u.email}</span>
//                       </div>
//                     </td>
//                     <td>{u.date}</td>
//                     <td><span className="hq-badge verified-sent">Verified</span></td>
//                     <td className="text-right">
//                       <button className="hq-btn-review" onClick={() => setSelectedCert(u)}>View PDF</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <footer className="hq-footer">
//               <div className="hq-footer-left">Showing {currentItems.length} of {filteredUsers.length}</div>
//               <div className="hq-pagination">
//                 <button className="pag-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&larr;</button>
//                 <span className="pag-info">Page {currentPage} of {totalPages || 1}</span>
//                 <button className="pag-btn" disabled={currentPage === totalPages || itemsPerPage === 'All'} onClick={() => setCurrentPage(p => p + 1)}>&rarr;</button>
//               </div>
//             </footer>
//           </div>
//         </div>
//       </div>

//       {/* PDF Modal Fix */}
//       {selectedCert && (
//         <div className="cert-interactive-modal-overlay" onClick={() => setSelectedCert(null)}>
//           <div className="cert-interactive-content" onClick={e => e.stopPropagation()}>
//             <div className="cert-modal-body" style={{ height: '70vh' }}>
//               {certLoading ? <p>Loading...</p> : <iframe src={certBlobUrl} style={{ width: '100%', height: '100%', border: 'none' }} />}
//             </div>
//             <div className="cert-modal-footer">
//               <button className="modal-action-btn secondary" onClick={() => setSelectedCert(null)}>Close</button>
//               <a href={selectedCert.pdf_url} target="_blank" rel="noreferrer" className="modal-action-btn primary">Download</a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Certificates;  //// 



import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import './Certificates.css';

const Certificates = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCert, setSelectedCert] = useState(null);
  const [certBlobUrl, setCertBlobUrl] = useState(null);
  const [certLoading, setCertLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, title: '', message: '', type: 'success' });

  const [highlightedEmails, setHighlightedEmails] = useState(new Set());
  const [certifiedUsers, setCertifiedUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    total_users: 0, successfully_sent: 0, already_certified: 0, failed: 0
  });

  const fetchRegistryData = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) setLoading(true);

      // Fetch separately to prevent one failure from blocking the other
      let certData = { data: [] };
      let usersData = [];

      try {
        const certRes = await axiosInstance.get('app/sent-certificates/');
        certData = certRes.data || {};
      } catch (e) {
        console.error("Cert List Fetch Error:", e);
      }

      try {
        const usersRes = await axiosInstance.get('app/users_list/');
        const resData = usersRes.data || {};
        usersData = Array.isArray(resData) ? resData : (resData.users || resData.results || []);
      } catch (e) {
        console.error("Users List Fetch Error:", e);
      }

      // Robust extraction of metrics
      const results = certData.results || certData || {};
      const sentList = Array.isArray(certData.data) ? certData.data :
        (Array.isArray(certData.pdf_urls) ? certData.pdf_urls :
          (Array.isArray(certData.results) ? certData.results : []));

      setMetrics({
        total_users: usersData.length || results.total_registered || 0,
        successfully_sent: results.total_sent ?? results.successfully_sent ?? sentList.length,
        already_certified: results.total_sent ?? results.already_certified ?? sentList.length,
        failed: results.failed ?? 0
      });

      // Map ALL users and link certificates if they exist
      const merged = usersData.map((user) => {
        if (!user) return null;

        const userEmail = (user.email || "").toLowerCase();
        const certMatch = sentList.find(c => {
          if (!c) return false;
          const certEmail = (c.email || c.user || "").toLowerCase();
          return certEmail === userEmail && userEmail !== "";
        });

        return {
          id: certMatch ? (certMatch.user_id || certMatch.id || t('cert_na', 'N/A')) : (user.id || t('cert_na', 'N/A')),
          email: user.email || t('cert_na', 'N/A'),
          pdf_url: certMatch ? (certMatch.pdf_url || certMatch.url) : null,
          full_name: user.full_name || user.username || t('cert_participant_default', 'Participant'),
          date: certMatch ? (certMatch.issued_at || certMatch.date) : (user.date_joined ? user.date_joined.split(' ')[0] : t('cert_na', 'N/A')),
          is_certified: !!certMatch
        };
      }).filter(Boolean); // Remove null entries

      setCertifiedUsers(merged);
    } catch (err) {
      console.error("Overall Sync Error:", err);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A' || dateStr === t('cert_na', 'N/A')) return dateStr;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString(i18n.language === 'mr' ? 'mr-IN' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  useEffect(() => { fetchRegistryData(); }, [fetchRegistryData]);

  // HANDLE DISTRIBUTE CERTIFICATE (POST API)
  const handleDistributeCertificates = async () => {
    try {
      setSending(true);
      const response = await axiosInstance.post('app/distribute_certificates/', { action: 'send_to_pending' });
      const data = response.data;

      if (data.status === "success") {
        const results = data.results || data;
        const sentCount = results.successfully_sent ?? results.sent ?? 0;

        if (sentCount === 0) {
          setToast({
            show: true,
            title: t('cert_toast_up_to_date_title', 'Registry Up to Date'),
            message: t('cert_toast_up_to_date_msg', 'All certificates have already been distributed to users.'),
            type: 'info'
          });
        } else {
          setToast({
            show: true,
            title: t('cert_toast_success_title', 'Distribution Successful'),
            message: t('cert_toast_success_msg', { count: sentCount, defaultValue: `Successfully sent certificates to ${sentCount} new users.` }),
            type: 'success'
          });

          // Highlight new users
          const newBatch = (data.pdf_urls || []).map(u => u.user);
          setHighlightedEmails(new Set(newBatch));
          setTimeout(() => setHighlightedEmails(new Set()), 6000);
        }

        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
        await fetchRegistryData(false);
      }
    } catch (err) {
      console.error("Distribution Error:", err);
    } finally {
      setSending(false);
    }
  };

  // Pagination & Filters (Safe Filtering)
  const filteredUsers = certifiedUsers.filter(u => {
    if (!u) return false;
    const s = searchTerm ? searchTerm.toLowerCase() : "";
    const matchesSearch = (u.full_name || "").toLowerCase().includes(s) ||
      (u.email || "").toLowerCase().includes(s);
    const matchesDate = !filterDate || u.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const effectiveItemsPerPage = itemsPerPage === 'All' ? filteredUsers.length : parseInt(itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / (effectiveItemsPerPage || 1));
  const currentItems = filteredUsers.slice((currentPage - 1) * effectiveItemsPerPage, currentPage * effectiveItemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterDate, itemsPerPage]);

  // PDF Preview Fix
  useEffect(() => {
    let url = null;
    if (selectedCert) {
      setCertLoading(true);
      // Use plain axios (not axiosInstance) since pdf_url is already an absolute URL
      axios.get(selectedCert.pdf_url, { responseType: 'blob' })
        .then(res => {
          url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
          setCertBlobUrl(url);
          setCertLoading(false);
        }).catch(() => setCertLoading(false));
    }
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [selectedCert]);

  return (
    <div className="hq-admin-panel">
      {/* PROFESSIONAL TOAST */}
      {toast.show && (
        <div className={`hq-success-toast ${toast.type === 'info' ? 'info-mode' : ''}`}>
          <div className="toast-icon">{toast.type === 'info' ? 'ℹ' : '✓'}</div>
          <div className="toast-content">
            <h4>{toast.title}</h4>
            <p>{toast.message}</p>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      <div className="panel-container">
        <header className="hq-header">
          <div className="hq-brand">
            <h1>{t('cert_title', 'Gramin AI')} <span className="hq-accent">{t('cert_highlight', 'Summit Registry')}</span></h1>
          </div>
          <div className="hq-tools">
            <button className="hq-sync-btn" onClick={() => fetchRegistryData()}>{t('cert_refresh', 'Refresh')}</button>
            <button className="trigger-btn" onClick={handleDistributeCertificates} disabled={sending}>
              {sending ? t('cert_processing', 'Processing...') : t('cert_distribute', 'Distribute Certificates')}
            </button>
          </div>
        </header>

        {/* METRICS CARDS */}
        <div className="hq-metrics-grid four-cols">
          <div className="metric-box pool"><div className="m-content"><span className="m-label">{t('cert_total_users', 'Total Users')}</span><span className="m-value">{metrics.total_users}</span></div></div>
          <div className="metric-box sent"><div className="m-content"><span className="m-label">{t('cert_newly_sent', 'Newly Sent')}</span><span className="m-value">{metrics.successfully_sent}</span></div></div>
          <div className="metric-box certified"><div className="m-content"><span className="m-label">{t('cert_already', 'Already Certified')}</span><span className="m-value">{metrics.already_certified}</span></div></div>
          <div className="metric-box failures"><div className="m-content"><span className="m-label">{t('cert_failed', 'Failed')}</span><span className="m-value">{metrics.failed}</span></div></div>
        </div>

        <div className="hq-workspace">
          <div className="workspace-header">
            <div className="hq-search">
              <input type="text" placeholder={t('cert_search', 'Search...')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="hq-filters">
              <select className="hq-row-select" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
                <option value={5}>{t('cert_show', 'Show')} 5</option><option value={10}>{t('cert_show', 'Show')} 10</option><option value={20}>{t('cert_show', 'Show')} 20</option><option value="All">{t('cert_show', 'Show')} All</option>
              </select>
              <input type="date" className="hq-date-input" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            </div>
          </div>

          <div className="table-zone">
            <table className="hq-table">
              <thead>
                <tr>
                  <th>{t('cert_sr', 'Sr. No.')}</th>
                  <th>{t('cert_ref', 'Ref ID')}</th>
                  <th>{t('cert_participant', 'Participant')}</th>
                  <th>{t('cert_date', 'Date Joined')}</th>
                  <th>{t('cert_status', 'Status')}</th>
                  <th className="text-right">{t('cert_action', 'Action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="no-data-msg">{t('cert_syncing', 'Syncing with cluster...')}</td></tr>
                ) : currentItems.map((u, i) => (
                  <tr key={u.email} className={highlightedEmails.has(u.email) ? 'row-highlight-active' : ''}>
                    <td>{((currentPage - 1) * effectiveItemsPerPage) + i + 1}</td>
                    <td><code>#{u.id}</code></td>
                    <td><div className="participant-info"><span className="p-name">{u.full_name}</span><span className="p-email">{u.email}</span></div></td>
                    <td>{formatDate(u.date)}</td>
                    <td>
                      <span className={`hq-badge ${u.is_certified ? 'verified-sent' : 'pending-status'}`}>
                        {u.is_certified ? t('cert_status_certified', 'Certified') : t('cert_status_pending', 'Not Sent')}
                      </span>
                    </td>
                    <td className="text-right">
                      {u.is_certified ? (
                        <button className="hq-btn-review" onClick={() => setSelectedCert(u)}>{t('cert_view', 'View PDF')}</button>
                      ) : (
                        <span className="no-action">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <footer className="hq-footer">
              <div className="hq-footer-left">{t('cert_records', 'Total Records:')} {filteredUsers.length}</div>
              <div className="hq-pagination">
                <button className="pag-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&larr;</button>
                <span className="pag-info">{t('cert_page', 'Page')} {currentPage} {t('cert_of', 'of')} {totalPages || 1}</span>
                <button className="pag-btn" disabled={currentPage === totalPages || itemsPerPage === 'All'} onClick={() => setCurrentPage(p => p + 1)}>&rarr;</button>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedCert && (
        <div className="cert-interactive-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cert-interactive-content" onClick={e => e.stopPropagation()}>
            <div className="cert-modal-body" style={{ height: '70vh' }}>
              {certLoading ? <p>{t('cert_loading', 'Loading PDF...')}</p> : <iframe src={certBlobUrl} style={{ width: '100%', height: '100%', border: 'none' }} />}
            </div>
            <div className="cert-modal-footer">
              <button className="modal-action-btn secondary" onClick={() => setSelectedCert(null)}>{t('cert_close', 'Close')}</button>
              <a href={selectedCert.pdf_url} target="_blank" rel="noreferrer" className="modal-action-btn primary">{t('cert_download', 'Download')}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;