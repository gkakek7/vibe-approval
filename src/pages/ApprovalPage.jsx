import { useState } from 'react'
import ApprovalAdmin from './ApprovalAdmin'
import './ApprovalPage.css'

const MENUS = [
  { id: 'pending', label: '결재대기' },
  { id: 'receive', label: '수신대기' },
  { id: 'send', label: '발송대기' },
  { id: 'draft', label: '임시보관' },
]

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export default function ApprovalPage() {
  const [activeMenu, setActiveMenu] = useState('pending')
  const [isAdmin, setIsAdmin] = useState(false)

  const handleMenuClick = (id) => {
    setIsAdmin(false)
    setActiveMenu(id)
  }

  const handleAdminClick = () => {
    setIsAdmin(true)
  }

  return (
    <div className="approval-layout">
      <aside className="approval-sidebar">
        <div className="approval-module-title">
          <span>전자결재</span>
          <button
            className={`approval-gear-btn ${isAdmin ? 'active' : ''}`}
            onClick={handleAdminClick}
            title="관리자 설정"
          >
            <GearIcon />
          </button>
        </div>
        <button className="approval-draft-btn">기안하기</button>
        <div className="approval-menu-section">
          <div className="approval-menu-header">해야할 일</div>
          {MENUS.map((m) => (
            <div
              key={m.id}
              className={`approval-menu-item ${!isAdmin && activeMenu === m.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(m.id)}
            >
              {m.label}
            </div>
          ))}
        </div>
      </aside>
      <main className="approval-main">
        {isAdmin ? (
          <ApprovalAdmin />
        ) : (
          <div className="approval-content">
            <h3 className="approval-content-title">
              {MENUS.find((m) => m.id === activeMenu)?.label}
            </h3>
            <p className="approval-empty">해당 항목이 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  )
}
