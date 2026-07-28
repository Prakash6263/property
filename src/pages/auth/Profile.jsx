import React, { useState, useRef, useEffect } from 'react';
import { useAuth, ROLE_LABELS } from '../../context/AuthContext';
import { DashLayout, PageHeader } from '../../components/common/DashboardComponents';
import { fetchUserProfile, updateUserProfile } from '../../services/userService';
import Swal from 'sweetalert2';

export default function Profile() {
  const { user, login } = useAuth();
  
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [fullName, setFullName] = useState(user?.full_name || user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [whatsappNumber, setWhatsappNumber] = useState(user?.whatsapp_number || '');
  const [nationality, setNationality] = useState(user?.nationality || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(user || {});

  // Fetch user profile from API on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        console.log('[v0] User profile fetched:', data);
        
        // Update local state with fetched data
        setProfileData(data);
        setFullName(data?.full_name || '');
        setPhoneNumber(data?.phone_number || '');
        setWhatsappNumber(data?.whatsapp_number || '');
        setNationality(data?.nationality || '');
        
        // Update auth context with fetched data
        const updatedUser = {
          ...user,
          ...data,
          name: data?.full_name,
        };
        login(updatedUser);
      } catch (error) {
        console.error('[v0] Failed to load user profile:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load profile. Please try again.',
          icon: 'error',
          confirmButtonColor: '#002B5C'
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: 'Error',
          text: 'Image size should be less than 2MB',
          icon: 'error',
          confirmButtonColor: '#002B5C'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        const updatedUser = {
          ...user,
          avatar: reader.result
        };
        login(updatedUser);
        Swal.fire({
          title: 'Avatar Updated',
          text: 'Profile picture changed successfully!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Full name is required',
        icon: 'error',
        confirmButtonColor: '#002B5C'
      });
      return;
    }

    try {
      setLoading(true);
      
      // Prepare update payload
      const updatePayload = {
        full_name: fullName,
        phone_number: phoneNumber,
        whatsapp_number: whatsappNumber,
        nationality: nationality || null,
      };

      // Call API to update profile
      const updatedData = await updateUserProfile(updatePayload);
      console.log('[v0] Profile updated:', updatedData);

      // Update context user object
      const updatedUser = {
        ...user,
        ...updatedData,
        avatar: avatar,
        name: updatedData?.full_name || fullName,
      };

      login(updatedUser);
      setProfileData(updatedData);
      setIsEditing(false);

      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('[v0] Error updating profile:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Failed to update profile. Please try again.',
        icon: 'error',
        confirmButtonColor: '#002B5C'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData?.id) {
    return (
      <DashLayout>
        <PageHeader title="My Profile" sub="Manage your profile details" />
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading profile...</p>
        </div>
      </DashLayout>
    );
  }

  return (
    <DashLayout>
      <PageHeader title="My Profile" sub="Manage your profile details" />
      
      <div className="row">
        <div className="col-lg-4 col-md-5">
          <div className="card text-center border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <div 
                className="position-relative mx-auto mb-3" 
                style={{ width: 100, height: 100, cursor: 'pointer' }}
                onClick={() => fileInputRef.current.click()}
              >
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt="Profile" 
                    style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid #00B5AD' }} 
                  />
                ) : (
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#002B5C,#00B5AD)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div 
                  className="position-absolute bottom-0 end-0 bg-turquoise text-white rounded-circle d-flex align-items-center justify-content-center shadow" 
                  style={{ width: 32, height: 32, border: '2px solid #fff' }}
                >
                  <i className="fe fe-camera" style={{ fontSize: '0.85rem' }}></i>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  accept="image/*" 
                  className="d-none" 
                />
              </div>
              <h4 className="fw-bold mb-1" style={{ color: '#002B5C' }}>{profileData?.full_name || user?.name || 'User'}</h4>
              <p className="text-muted small mb-3">{profileData?.email || user?.email}</p>
              <span className="badge bg-turquoise rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: '0.8rem' }}>
                {ROLE_LABELS[profileData?.role] || profileData?.role || user?.role || 'User'}
              </span>
              
              <hr className="my-4" />
              
              <div className="text-start">
                <h6 className="fw-bold mb-2" style={{ color: '#002B5C' }}>Status:</h6>
                <p className="small text-muted mb-3">
                  <span className="badge bg-success-light text-success px-2 py-1 rounded">
                    {profileData?.status ? profileData.status.toUpperCase() : 'ACTIVE'}
                  </span>
                </p>
                
                <h6 className="fw-bold mb-2" style={{ color: '#002B5C' }}>Last Login:</h6>
                <p className="small text-muted mb-0">
                  {profileData?.last_login ? new Date(profileData.last_login).toLocaleString() : 'Just now'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-7">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0" style={{ color: '#002B5C' }}>Personal Details</h5>
                {!isEditing && (
                  <button 
                    type="button" 
                    className="btn btn-sm btn-turquoise rounded-pill"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fe fe-edit me-1"></i> Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSave}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      disabled={!isEditing}
                      style={{ borderRadius: 10 }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={profileData?.email || user?.email || ''} 
                      disabled 
                      style={{ borderRadius: 10, background: '#f8f9fa' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      disabled={!isEditing}
                      style={{ borderRadius: 10 }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">WhatsApp Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={whatsappNumber}
                      onChange={e => setWhatsappNumber(e.target.value)}
                      disabled={!isEditing}
                      style={{ borderRadius: 10 }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Nationality</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={nationality}
                      onChange={e => setNationality(e.target.value)}
                      disabled={!isEditing}
                      style={{ borderRadius: 10 }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Account Created</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString() : user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'} 
                      disabled 
                      style={{ borderRadius: 10, background: '#f8f9fa' }}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => {
                        setFullName(user?.full_name || user?.name || '');
                        setPhoneNumber(user?.phone_number || '');
                        setWhatsappNumber(user?.whatsapp_number || '');
                        setNationality(user?.nationality || '');
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-sm btn-turquoise rounded-pill px-4"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
