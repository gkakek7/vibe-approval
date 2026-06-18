import './FormManage.css'

const FORM_BOX_BTNS = ['양식함 추가', '양식함 수정', '양식함 삭제']
const FORM_BTNS = ['양식 추가', '양식 수정', '양식 삭제']

export default function FormManage() {
  return (
    <div className="form-manage">
      <div className="form-manage-toolbar">
        <div className="form-manage-btn-group">
          {FORM_BOX_BTNS.map((label) => (
            <button key={label} className="form-manage-btn">{label}</button>
          ))}
        </div>
        <div className="form-manage-btn-group">
          {FORM_BTNS.map((label) => (
            <button key={label} className="form-manage-btn">{label}</button>
          ))}
        </div>
      </div>
      <p className="form-manage-empty">등록된 양식이 없습니다.</p>
    </div>
  )
}
