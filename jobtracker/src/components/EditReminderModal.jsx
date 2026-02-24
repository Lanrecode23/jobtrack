import React, { useState } from 'react'
import { useReminderStore } from '../Store/useReminderStore';
import Swal from 'sweetalert2';

function EditReminderModal({ editingReminder, setEditingReminder }) {
  const [loading, setLoading] = useState(false);
  const { updateReminder } = useReminderStore();

  const handleUpdate = async () => {

    setLoading(true);

    try {
      await updateReminder(editingReminder.id, {
        company: editingReminder.company,
        position: editingReminder.position,
        status: editingReminder.status,
        mode: editingReminder.mode,
        interviewNotes: editingReminder.interviewNotes, 
      });

      Swal.fire({
        icon: "success",
        html: "<p style='font-size: 0.9rem;'>Reminder updated successfully</p>",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
      setEditingReminder(null);
    } catch (error) {
      console.error('Update error:', error); 
      Swal.fire({
        icon: "error",
        html: "<p style='font-size: 0.9rem;'>Error updating reminder</p>",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
    
  };

  if (!editingReminder) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setEditingReminder(null)}
      ></div>

      <div className="modal show d-block " tabIndex="-1" aria-hidden="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title text-primary">Edit Reminder</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditingReminder(null)}
              ></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Company</label>
                <input
                  className="form-control"
                  value={editingReminder.company}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      company: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  className="form-control"
                  value={editingReminder.position}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      position: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editingReminder.status}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="mode" className="form-label">Mode:</label>
                <textarea
                  className="form-control"
                  id="mode"
                  rows="3"
                  value={editingReminder.mode}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      mode: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setEditingReminder(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={handleUpdate}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default EditReminderModal
