import React, { useEffect, useState } from "react";

function PopupWindow({ onClose, children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleModalClose = () => {
    setIsMounted(false);
    onClose();
  };

  return (
    <>
      {isMounted && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-header"
              style={{ justifyContent: "flex-end" }}
            >
              <button
                className="close-button"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={handleModalClose}
              >
                X
              </button>
            </div>
            <div className="modal-body p-3">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupWindow;
