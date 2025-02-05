import { CircularProgress, Modal } from "@mui/material"

interface IndicatorProps {
    uploading:boolean;
    copyImage:boolean;
    deleteLoading:boolean;
    saving:boolean;
}

const LoadingIndicator = ({uploading, copyImage, deleteLoading, saving} : IndicatorProps) => {
    return (
        <div>
            <Modal
                open={uploading || copyImage || deleteLoading || saving}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <div className="flex flex-col justify-center items-center w-64 h-64 lg:w-1/2 lg:h-1/2 md:w-96 md:h-96 bg-gray-200 rounded-lg">
                    <div>
                    <CircularProgress color="primary"/>
                    </div>
                    <div>
                    <p className="p-5 text-gray-700 text-xl font-medium">
                        {saving ? "Saving Image": (copyImage ? "Sending image to printer" : (deleteLoading ? "Deleting Image" : "Uploading Image..."))}
                    </p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default LoadingIndicator;