import { useState } from 'react'
import './FormManage.css'

function findNode(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n
    const found = findNode(n.children, id)
    if (found) return found
  }
  return null
}

function removeNode(nodes, id) {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => ({ ...n, children: removeNode(n.children, id) }))
}

function addChild(nodes, parentId, newNode) {
  return nodes.map((n) => {
    if (n.id === parentId) return { ...n, children: [...n.children, newNode] }
    return { ...n, children: addChild(n.children, parentId, newNode) }
  })
}

function renameNode(nodes, id, name) {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, name }
    return { ...n, children: renameNode(n.children, id, name) }
  })
}

function FormBoxNode({ node, selectedId, onSelect, depth = 0 }) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children.length > 0

  return (
    <div>
      <div
        className={`formbox-node ${selectedId === node.id ? 'selected' : ''}`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => onSelect(node.id)}
      >
        <span
          className="formbox-toggle"
          onClick={(e) => { e.stopPropagation(); if (hasChildren) setOpen(!open) }}
        >
          {hasChildren ? (open ? '▼' : '▶') : ''}
        </span>
        <span className="formbox-icon">📁</span>
        <span className="formbox-name">{node.name}</span>
      </div>
      {open && hasChildren && node.children.map((child) => (
        <FormBoxNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function FormManage() {
  const [boxes, setBoxes] = useState([])
  const [selectedBoxId, setSelectedBoxId] = useState(null)
  const [modal, setModal] = useState({ open: false, mode: 'add', value: '' })

  const closeModal = () => setModal({ open: false, mode: 'add', value: '' })

  const handleAddBox = () => {
    setModal({ open: true, mode: 'add', value: '' })
  }

  const handleEditBox = () => {
    if (!selectedBoxId) return
    const node = findNode(boxes, selectedBoxId)
    setModal({ open: true, mode: 'edit', value: node?.name || '' })
  }

  const handleDeleteBox = () => {
    if (!selectedBoxId) return
    setBoxes(removeNode(boxes, selectedBoxId))
    setSelectedBoxId(null)
  }

  const handleConfirm = () => {
    const name = modal.value.trim()
    if (!name) return

    if (modal.mode === 'add') {
      const newNode = { id: Date.now(), name, children: [] }
      if (!selectedBoxId) {
        setBoxes((prev) => [...prev, newNode])
      } else {
        setBoxes((prev) => addChild(prev, selectedBoxId, newNode))
      }
    } else {
      setBoxes((prev) => renameNode(prev, selectedBoxId, name))
    }
    closeModal()
  }

  return (
    <div className="form-manage">
      <div className="form-manage-toolbar">
        <div className="form-manage-btn-group">
          <button className="form-manage-btn" onClick={handleAddBox}>양식함 추가</button>
          <button className="form-manage-btn" onClick={handleEditBox} disabled={!selectedBoxId}>양식함 수정</button>
          <button className="form-manage-btn danger" onClick={handleDeleteBox} disabled={!selectedBoxId}>양식함 삭제</button>
        </div>
        <div className="form-manage-btn-group">
          <button className="form-manage-btn" disabled={!selectedBoxId}>양식 추가</button>
          <button className="form-manage-btn" disabled={!selectedBoxId}>양식 수정</button>
          <button className="form-manage-btn danger" disabled={!selectedBoxId}>양식 삭제</button>
        </div>
      </div>

      <div className="form-manage-panels">
        <div className="form-manage-left">
          <div className="form-panel-title">양식함 목록</div>
          <div className="formbox-tree">
            {boxes.length === 0 ? (
              <p className="form-manage-empty">등록된 양식함이 없습니다.</p>
            ) : (
              boxes.map((node) => (
                <FormBoxNode
                  key={node.id}
                  node={node}
                  selectedId={selectedBoxId}
                  onSelect={setSelectedBoxId}
                />
              ))
            )}
          </div>
        </div>
        <div className="form-manage-right">
          <div className="form-panel-title">양식 목록</div>
          <p className="form-manage-empty">
            {selectedBoxId ? '등록된 양식이 없습니다.' : '양식함을 선택하세요.'}
          </p>
        </div>
      </div>

      {modal.open && (
        <div className="form-modal-overlay" onClick={closeModal}>
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-title">
              {modal.mode === 'add' ? '양식함 추가' : '양식함 수정'}
            </div>
            <input
              className="form-modal-input"
              placeholder="양식함 이름을 입력하세요"
              value={modal.value}
              onChange={(e) => setModal((prev) => ({ ...prev, value: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              autoFocus
            />
            <div className="form-modal-actions">
              <button className="form-modal-btn confirm" onClick={handleConfirm}>확인</button>
              <button className="form-modal-btn cancel" onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
