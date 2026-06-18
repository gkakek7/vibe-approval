import { useState } from 'react'
import FormManage from './admin/FormManage'
import './ApprovalAdmin.css'

const ADMIN_MENUS = [
  { id: 'form', label: '양식관리' },
  { id: 'doc-progress', label: '전체 문서 조회(진행문서)' },
  { id: 'doc-complete', label: '전체 문서 조회(완료문서)' },
  { id: 'dept-seal', label: '부서별직인대장' },
  { id: 'receiver-group', label: '수신자 그룹지정' },
  { id: 'seal', label: '관인대장' },
]

export default function ApprovalAdmin() {
  const [activeTab, setActiveTab] = useState('form')

  return (
    <div className="approval-admin">
      <h3 className="approval-admin-title">전자결재 관리자</h3>
      <div className="approval-admin-tabs">
        {ADMIN_MENUS.map((m) => (
          <button
            key={m.id}
            className={`approval-admin-tab ${activeTab === m.id ? 'active' : ''}`}
            onClick={() => setActiveTab(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="approval-admin-content">
        {activeTab === 'form' && <FormManage />}
        {activeTab !== 'form' && (
          <p className="approval-admin-empty">
            {ADMIN_MENUS.find((m) => m.id === activeTab)?.label} 항목이 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
