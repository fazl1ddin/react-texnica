import { useState } from 'react'
import '../css/Profile.css'

const tabs = [
    {
        path: '/profile',
        stateTab: 'allData',
        title: 'Общие сведения'
    },
    {
        path: '/profile',
        stateTab: 'personData',
        title: 'Личные данные'
    },
    {
        path: '/profile',
        stateTab: 'historyShop',
        title: 'История покупок'
    },
    {
        path: '/favorites',
        title: 'Избранное'
    },
    {
        path: '/profile',
        stateTab: 'changePass',
        title: 'Сменить пароль'
    },
]

function Profile({user}) {
    const [active, setActive] = useState('allData')
    const orders = 0

    return <div className="profile">
        <div className="window">
            <h1>Общие сведения</h1>
            <div className="profileTabs">
                <div className="profileTabButtons">
                    {
                        tabs.map((item, index) => (
                            <div key={index} onClick={() => {
                                setActive(item.stateTab)
                            }} className={active === item.stateTab ? 'active' : undefined}>{ item.title }</div>
                        ))
                    }
                </div>
                <div className="profileTabContent">
                    {
                        active === 'allData' && 
                        <div>
                            <h2>{user.name}</h2>
                            <div className="profileADO">
                                <div className="profileAvatar">
                                    {user.photo ? <img src="" alt="" /> : <>:(</>}
                                </div>
                                <div className="profileDO">
                                    <p>Дата регистрации: {user.dateReg }</p>
                                    <p>Заказов: {orders}</p>
                                </div>    
                            </div>
                            <div className="profileText">
                                Добро пожаловать в панель управления. Здесь вы можете <a>изменить свои регистрационные     данные</a> и <a>cменить пароль</a>. Зарегистрированные пользователи имеют доступ к <a>истории заказов</a>     и возможность <a>добавлять в избранное товары для будущих покупок</a>.
                            </div>    
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Profile