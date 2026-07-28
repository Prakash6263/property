import React from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper } from '../../components/layout/PageWrapper';

// Reusable KPI card matching shipment project's StatCards pattern
export function KPICard({ title, value, icon, colorClass, sub, trend }) {
  return (
    <div className={`card ${colorClass}`}>
      <div className="card-body">
        <div className="dash-widget-header">
          <span className="dash-widget-icon bg-1">
            <i className={icon}></i>
          </span>
          <div className="dash-count">
            <div className="dash-title">{title}</div>
            <div className="dash-counts"><p>{value}</p></div>
          </div>
        </div>
        {(sub || trend) && (
          <div className="d-flex align-items-center mt-2 pt-2 border-top">
            {trend && (
              <span className={`badge me-2 ${trend > 0 ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: '0.72rem' }}>
                <i className={`fe ${trend > 0 ? 'fe-trending-up' : 'fe-trending-down'} me-1`}></i>{Math.abs(trend)}%
              </span>
            )}
            {sub && <span className="text-muted" style={{ fontSize: '0.75rem' }}>{sub}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable page header
export function PageHeader({ title, sub, actions }) {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h5 className="page-title">{title}</h5>
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active">{sub || title}</li>
          </ul>
        </div>
        {actions && <div className="col-auto d-flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

// Reusable Dashboard Layout
export function DashLayout({ children }) {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <PageWrapper>
        {children}
      </PageWrapper>
    </div>
  );
}
