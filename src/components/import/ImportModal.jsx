import '../../styles/components/import-modal.css';

export default function ImportModal({
  isOpen,
  onClose,
  importText,
  setImportText,
  importImages,
  setImportImages,
  handleImport,
  importLoading
}) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="import-modal-overlay">

      <div className="import-modal">

        <div className="import-modal-header">

          <h2>
            Import Item
          </h2>

          <button
            className="import-modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="import-modal-content">

          <textarea
            className="import-textarea"
            value={importText}
            onChange={(e) =>
              setImportText(e.target.value)
            }
            placeholder="Paste MASTER PROMPT text here..."
            rows={12}
          />

          <label className="image-upload-box">

            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={(e) =>
                setImportImages(
                  Array.from(e.target.files)
                )
              }
            />

            <span>
              Select Images
            </span>

          </label>

          {
            importImages.length > 0 && (
              <div className="image-preview-grid">

                {
                  importImages.map((image, index) => (

                    <div
                      key={index}
                      className="image-preview-card"
                    >

                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                      />

                      <span>
                        {image.name}
                      </span>

                    </div>

                  ))
                }

              </div>
            )
          }

        </div>

        <div className="import-modal-footer">

          <button
            className="import-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="import-submit-btn"
            onClick={handleImport}
            disabled={importLoading}
          >

            {
              importLoading
                ? 'Importing...'
                : 'Import Item'
            }

          </button>

        </div>

      </div>

    </div>
  );
}