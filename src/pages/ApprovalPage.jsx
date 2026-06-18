import { useState } from 'react'
import './ApprovalPage.css'

const MENUS = [
  { id: 'pending', label: '결재대기' },
  { id: 'receive', label: '수신대기' },
  { id: 'send', label: '발송대기' },
  { id: 'draft', label: '임시보관' },
]

export default function ApprovalPage() {
  const [activeMenu, setActiveMenu] = useState('pending')

  return (
    <div className="approval-layout">
      <aside className="approval-sidebar">
        <div className="approval-module-title">전자결재</div>
        <button className="approval-draft-btn">기안하기</button>
        <div className="approval-menu-section">
          <div className="approval-menu-header">해야할 일</div>
          {MENUS.map((m) => (
            <div
              key={m.id}
              className={`approval-menu-item ${activeMenu === m.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(m.id)}
            >
              {m.label}
            </div>
          ))}
        </div>
      </aside>
      <main className="approval-main">
        <div className="approval-content">
          <h3 className="approval-content-title">
            {MENUS.find((m) => m.id === activeMenu)?.label}
          </h3>
          <p className="approval-empty">해당 항목이 없습니다.</p>
        </div>
      </main>
    </div>
  )
}
