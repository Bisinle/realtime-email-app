import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item",
}) {
    const { setNotificationOnDelete } = useStateContext();

    const handleConfirm = () => {
        onConfirm();
        onClose();
        setNotificationOnDelete(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-slate-700">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-100">
                        Delete Confirmation
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-200">
                            Are you sure you want to delete {itemName}?
                        </p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={handleConfirm}
                        >
                            Delete
                        </button>
                        <button
                            id="cancel-btn"
                            className="mt-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
