import './css.css'

function LoginButton(){
    return (
        <div style={{
            width: 100,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="box">
                <div className="loader-03" style={{
                    width: 24,
                    height: 24
                }}></div>
            </div>
        </div>
    )
}

export default LoginButton