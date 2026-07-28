import React, { useState } from 'react';
import { DashLayout, KPICard, PageHeader } from '../../components/common/DashboardComponents';
import { useNavigate } from 'react-router-dom';

const kpis = [
  { title: 'Total Properties', value: '64', icon: 'fa-solid fa-building', colorClass: 'card-blue', trend: 5 },
  { title: 'Total Units', value: '892', icon: 'fa-solid fa-door-open', colorClass: 'card-purple', trend: 3 },
  { title: 'Occupied Units', value: '748', icon: 'fa-solid fa-user-check', colorClass: 'card-green', trend: 8 },
  { title: 'Available Units', value: '108', icon: 'fa-solid fa-door-closed', colorClass: 'card-pink', trend: -5 },
  { title: 'Reserved Units', value: '24', icon: 'fa-solid fa-bookmark', colorClass: 'card-orange', trend: 12 },
  { title: 'Blocked Units', value: '12', icon: 'fa-solid fa-ban', colorClass: 'card-purple', sub: 'Under maintenance' },
  { title: 'Occupancy Rate', value: '83.8%', icon: 'fa-solid fa-chart-pie', colorClass: 'card-blue', trend: 2.3 },
  { title: 'Vacating Soon', value: '18', icon: 'fa-solid fa-calendar-xmark', colorClass: 'card-pink', sub: 'Next 30 days' },
];

const INITIAL_PROPERTIES = [
  { id: 'P001', name: 'Marina Heights', area: 'Dubai Marina', type: 'Residential', units: 120, occupied: 108, available: 8, reserved: 4, manager: 'Sara Khalid', address: 'Marina Plaza, Dubai Marina', desc: 'Luxury high-rise residential apartments with scenic views.', amenities: 'Gym, Pool, Security' },
  { id: 'P002', name: 'Al Barsha Villa Complex', area: 'Al Barsha', type: 'Villa', units: 45, occupied: 40, available: 3, reserved: 2, manager: 'Sara Khalid', address: 'Street 4, Al Barsha 1', desc: 'Premium villa community with private gardens.', amenities: 'Private Pool, Gym, Covered Parking' },
  { id: 'P003', name: 'Downtown Business Tower', area: 'Downtown Dubai', type: 'Commercial', units: 200, occupied: 165, available: 28, reserved: 7, manager: 'Sara Khalid', address: 'Sheikh Zayed Road, Downtown', desc: 'State-of-the-art grade-A commercial office space.', amenities: 'Valet, Fiber Internet, Conference Center' },
  { id: 'P004', name: 'JBR Serviced Apartments', area: 'JBR', type: 'Serviced', units: 80, occupied: 72, available: 6, reserved: 2, manager: 'Sara Khalid', address: 'The Walk, JBR', desc: 'Fully serviced luxury beachside apartments.', amenities: 'Beach Access, Housekeeping, Spa' },
  { id: 'P005', name: 'Silicon Oasis Towers', area: 'Silicon Oasis', type: 'Residential', units: 150, occupied: 118, available: 22, reserved: 10, manager: 'Sara Khalid', address: 'Silicon Oasis Blvd', desc: 'Affordable modern living spaces for families.', amenities: 'Playground, Retail Center, Security' },
];

export default function PropertyDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  
  // Forms states
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '', code: '', area: '', address: '', manager: 'Sara Khalid', type: 'Residential', amenities: '', description: ''
  });
  
  const [blockData, setBlockData] = useState({
    unitNo: '', action: 'Block', reason: 'Maintenance Work', date: ''
  });

  const filtered = properties.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase()));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newProp = {
      id: `P00${properties.length + 1}`,
      name: formData.name,
      area: formData.area,
      type: formData.type,
      units: 1,
      occupied: 0,
      available: 1,
      reserved: 0,
      manager: formData.manager,
      address: formData.address,
      desc: formData.description,
      amenities: formData.amenities
    };
    setProperties([...properties, newProp]);
    setShowAddModal(false);
    alert('Property added successfully!');
  };

  const handleEditClick = (prop) => {
    setSelectedProperty(prop);
    setFormData({
      name: prop.name,
      code: prop.id,
      area: prop.area,
      address: prop.address || '',
      manager: prop.manager,
      type: prop.type,
      amenities: prop.amenities || '',
      description: prop.desc || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProperties(properties.map(p => p.id === selectedProperty.id ? { ...p, ...formData } : p));
    setShowEditModal(false);
    alert('Property details updated!');
  };

  const handleBlockSubmit = (e) => {
    e.preventDefault();
    setShowBlockModal(false);
    alert(`Unit ${blockData.unitNo} successfully ${blockData.action}ed for ${blockData.reason}.`);
  };

  return (
    <DashLayout>
      <PageHeader
        title="Property & Unit Management"
        sub="Property Manager"
        actions={
          <>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowBlockModal(true)}>
              <i className="fe fe-ban me-1"></i>Block / Release Unit
            </button>
            <button className="btn btn-sm btn-turquoise" onClick={() => setShowAddModal(true)}>
              <i className="fe fe-plus me-1"></i>Add Property
            </button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-xl-3 col-sm-6 col-12">
            <KPICard {...k} />
          </div>
        ))}
      </div>

      {/* Occupancy overview bar */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Overall Occupancy</h6>
            <span className="fw-bold" style={{ color: '#00B5AD' }}>83.8%</span>
          </div>
          <div className="progress" style={{ height: 20, borderRadius: 10 }}>
            <div className="progress-bar" style={{ width: '83.8%', background: 'linear-gradient(90deg,#00B5AD,#00D2CB)', borderRadius: 10 }}></div>
          </div>
          <div className="row g-2 mt-2">
            {[['Occupied', 748, '#28a745'], ['Available', 108, '#00B5AD'], ['Reserved', 24, '#ffc107'], ['Blocked', 12, '#dc3545']].map(([l, v, c]) => (
              <div key={l} className="col-3 text-center">
                <div className="fw-bold" style={{ color: c }}>{v}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property List */}
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Properties</h5>
            <div className="d-flex gap-2 align-items-center">
              <div className="input-group" style={{ width: 220 }}>
                <input type="text" className="form-control form-control-sm" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                <span className="input-group-text"><i className="fe fe-search"></i></span>
              </div>
              <div className="btn-group btn-group-sm">
                <button className={`btn ${view === 'table' ? 'btn-primary-navy' : 'btn-outline-secondary'}`} onClick={() => setView('table')}><i className="fe fe-list"></i></button>
                <button className={`btn ${view === 'card' ? 'btn-primary-navy' : 'btn-outline-secondary'}`} onClick={() => setView('card')}><i className="fe fe-grid"></i></button>
              </div>
            </div>
          </div>
        </div>
        {view === 'table' ? (
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th><th>Property</th><th>Area</th><th>Type</th><th>Total</th><th>Occupied</th><th>Available</th><th>Reserved</th><th>Occupancy%</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={i}>
                      <td><code>{p.id}</code></td>
                      <td className="fw-500">{p.name}</td>
                      <td>{p.area}</td>
                      <td><span className="badge" style={{ background: '#004aad20', color: '#004aad', fontSize: '0.72rem' }}>{p.type}</span></td>
                      <td>{p.units}</td>
                      <td><span style={{ color: '#28a745', fontWeight: 600 }}>{p.occupied}</span></td>
                      <td><span style={{ color: '#00B5AD', fontWeight: 600 }}>{p.available}</span></td>
                      <td><span style={{ color: '#ffc107', fontWeight: 600 }}>{p.reserved}</span></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: 6, borderRadius: 3 }}>
                            <div className="progress-bar" style={{ width: `${Math.round(p.occupied / p.units * 100)}%`, background: 'linear-gradient(90deg,#00B5AD,#00D2CB)' }}></div>
                          </div>
                          <span style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{Math.round(p.occupied / p.units * 100)}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-primary" title="View" onClick={() => navigate('/property/units')}><i className="fe fe-eye"></i></button>
                          <button className="btn btn-sm btn-outline-secondary" title="Edit" onClick={() => handleEditClick(p)}><i className="fe fe-edit"></i></button>
                          <button className="btn btn-sm btn-outline-success" title="Add Unit" onClick={() => navigate('/property/units')}><i className="fe fe-plus"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="row g-3">
              {filtered.map((p, i) => (
                <div key={i} className="col-xl-4 col-md-6">
                  <div className="property-card card h-100">
                    <div style={{ height: 140, background: `linear-gradient(135deg, #002B5C${Math.floor(i * 30 + 100).toString(16)}, #00B5AD)`, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fe fe-home text-white" style={{ fontSize: '3rem', opacity: 0.6 }}></i>
                    </div>
                    <div className="card-body">
                      <h6 className="fw-bold mb-1">{p.name}</h6>
                      <p className="text-muted mb-2" style={{ fontSize: '0.82rem' }}><i className="fe fe-map-pin me-1"></i>{p.area}</p>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge badge-active">{p.occupied}/{p.units} Occupied</span>
                        <span className="badge badge-vacant">{p.available} Available</span>
                      </div>
                      <div className="progress" style={{ height: 6, borderRadius: 3 }}>
                        <div className="progress-bar" style={{ width: `${Math.round(p.occupied / p.units * 100)}%`, background: 'linear-gradient(90deg,#00B5AD,#00D2CB)' }}></div>
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => navigate('/property/units')}>View Details</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditClick(p)}>Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Add New Property</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label">Property Name</label><input type="text" className="form-control" required onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label">Property Code</label><input type="text" className="form-control" required onChange={e => setFormData({ ...formData, code: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label">Area</label><input type="text" className="form-control" required onChange={e => setFormData({ ...formData, area: e.target.value })} /></div>
                    <div className="col-md-6">
                      <label className="form-label">Property Type</label>
                      <select className="form-select" onChange={e => setFormData({ ...formData, type: e.target.value })}>
                        <option>Residential</option><option>Villa</option><option>Commercial</option><option>Serviced</option>
                      </select>
                    </div>
                    <div className="col-md-6"><label className="form-label">Manager</label><input type="text" className="form-control" defaultValue="Sara Khalid" onChange={e => setFormData({ ...formData, manager: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label">Amenities</label><input type="text" className="form-control" placeholder="Pool, Gym, Parking" onChange={e => setFormData({ ...formData, amenities: e.target.value })} /></div>
                    <div className="col-12"><label className="form-label">Address</label><input type="text" className="form-control" required onChange={e => setFormData({ ...formData, address: e.target.value })} /></div>
                    <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="2" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea></div>
                    {/* Media Upload Mock */}
                    <div className="col-12">
                      <label className="form-label">Upload Photos, Videos & Floor Plans</label>
                      <div style={{ border: '2px dashed #ddd', borderRadius: 8, padding: 20, textAlign: 'center', background: '#f8f9fa' }}>
                        <i className="fe fe-upload-cloud" style={{ fontSize: '2rem', color: '#00B5AD' }}></i>
                        <p className="mb-0 mt-2 small text-muted">Drag & drop files here to upload property media</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-turquoise">Add Property</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Property Modal */}
      {showEditModal && selectedProperty && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Edit Property: {selectedProperty.name}</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label">Property Name</label><input type="text" className="form-control" value={formData.name} required onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label">Property Code</label><input type="text" className="form-control" value={formData.code} disabled /></div>
                    <div className="col-md-6"><label className="form-label">Area</label><input type="text" className="form-control" value={formData.area} required onChange={e => setFormData({ ...formData, area: e.target.value })} /></div>
                    <div className="col-md-6">
                      <label className="form-label">Property Type</label>
                      <select className="form-select" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                        <option>Residential</option><option>Villa</option><option>Commercial</option><option>Serviced</option>
                      </select>
                    </div>
                    <div className="col-md-6"><label className="form-label">Manager</label><input type="text" className="form-control" value={formData.manager} onChange={e => setFormData({ ...formData, manager: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label">Amenities</label><input type="text" className="form-control" value={formData.amenities} onChange={e => setFormData({ ...formData, amenities: e.target.value })} /></div>
                    <div className="col-12"><label className="form-label">Address</label><input type="text" className="form-control" value={formData.address} required onChange={e => setFormData({ ...formData, address: e.target.value })} /></div>
                    <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-turquoise">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Block or Release Unit Modal */}
      {showBlockModal && (
        <div className="modal show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 16 }}>
              <div className="modal-header" style={{ background: 'linear-gradient(90deg,#002B5C,#00B5AD)' }}>
                <h5 className="modal-title text-white">Block or Release Unit</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowBlockModal(false)}></button>
              </div>
              <form onSubmit={handleBlockSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Unit Number</label>
                      <input type="text" className="form-control" required placeholder="e.g. Unit 302" value={blockData.unitNo} onChange={e => setBlockData({ ...blockData, unitNo: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Action</label>
                      <select className="form-select" value={blockData.action} onChange={e => setBlockData({ ...blockData, action: e.target.value })}>
                        <option>Block</option><option>Release</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Reason / Purpose</label>
                      <select className="form-select" value={blockData.reason} onChange={e => setBlockData({ ...blockData, reason: e.target.value })}>
                        <option>Maintenance Work</option><option>Reserved for VIP</option><option>Owner Occupied</option><option>Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Effective Date</label>
                      <input type="date" className="form-control" required value={blockData.date} onChange={e => setBlockData({ ...blockData, date: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBlockModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-turquoise">Apply Action</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
