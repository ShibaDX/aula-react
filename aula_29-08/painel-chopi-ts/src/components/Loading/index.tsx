interface IProps {
    visible: boolean
}

export const Loading = (props: IProps) => {

    return (
        <>
        {
            props.visible && (
            <div className="d-flex justify-content-center align-items-center"
                style={{
                    position: 'fixed',
                    zIndex: 99,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgb(38, 38, 38, 0.2)'
                }}
            >
                <div
                    className="spinner-border"
                    role="status"
                    style={{
                        width: 70,
                        height: 70
                    }}
                />

            </div>
            )
        }
        </>
    )
}