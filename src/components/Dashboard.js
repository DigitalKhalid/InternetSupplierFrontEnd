import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
      if(!localStorage.getItem('authtoken')){
        navigate('/admin/login')
      }
    }, [localStorage.getItem('authtoken')])
    
    return (
        <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, ducimus facere quisquam veritatis repudiandae assumenda minima doloremque excepturi. Qui non mollitia atque porro necessitatibus dicta voluptatibus voluptatem. Tempore debitis veritatis, numquam officiis quos quibusdam quo eum beatae, sint magnam sequi hic. Quia suscipit accusamus libero iure sequi aut perspiciatis accusantium similique, quas repudiandae quam earum saepe obcaecati, aliquam ut a tempora veniam sed possimus assumenda rem consectetur laborum. Autem blanditiis officia dolorem non repellendus eius sapiente explicabo. Error, eum rerum. Quia optio ipsa necessitatibus saepe beatae corrupti fugiat, eius ipsam excepturi voluptatum. Cum aut, consequatur possimus sed omnis fugit quia eum obcaecati officiis eius tempora at quaerat maiores, vel facere culpa nihil iusto perspiciatis! Accusantium sed exercitationem recusandae, repudiandae, unde quo iure enim, voluptatem cupiditate libero similique mollitia dolores ratione est suscipit? Impedit fugiat assumenda non voluptatem itaque magnam voluptatibus cumque quidem autem? Ipsam, omnis necessitatibus sapiente corporis soluta inventore eligendi similique perspiciatis fuga quo rerum. Nulla, itaque amet quasi, blanditiis nobis quos dicta repellat fugit eos sunt doloremque voluptatum pariatur delectus magni consequatur. Quos eos numquam, error nemo obcaecati molestias suscipit molestiae omnis ipsam, architecto ut! Quibusdam porro repudiandae dignissimos architecto. Explicabo deleniti tenetur voluptates soluta cumque repudiandae magnam aliquid iure dolorum, aut, est facilis dignissimos quidem molestiae unde dicta totam molestias earum ab alias sapiente perferendis. Ullam repudiandae perferendis officiis quos expedita enim vitae porro nam dolore ab similique nostrum commodi quas rem laborum, illo sequi dignissimos sapiente fugiat suscipit, unde exercitationem aspernatur. Ducimus nisi debitis, in consectetur inventore iusto esse reiciendis iure eaque illo placeat vel vero veniam expedita non totam voluptatibus ratione! Ab similique eligendi velit ipsa laudantium placeat sunt. Maiores neque laboriosam voluptatibus obcaecati, magnam illo ducimus laudantium minima atque eum placeat voluptas, autem distinctio minus voluptates totam rerum voluptatem fugit tempora non hic. Explicabo.
        </div>
    )
}
