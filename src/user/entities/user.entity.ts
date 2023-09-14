import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("user")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; // 自增长ID, 标记成主键
    
    @Column({ length: 30 })
    username: string; // 用户名

    @Column()
    password: string; // 密码
}
