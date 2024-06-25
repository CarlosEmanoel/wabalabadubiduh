export default function DefaultSkeleton({ className, iconWidth = "25%", icon }) {
    return (
        <div className={`skeleton ${className} flex justify-center items-center`}>
            {icon && <img draggable={false} className="sepia" src="https://expansaodigital.tec.br/performance.api/files/ic_file_image_outlined" width={iconWidth} />}
        </div>
    )
} 