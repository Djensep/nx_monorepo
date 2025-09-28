import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'preferences' })
export class PreferencesEntity {
  @PrimaryColumn('uuid')
  userId!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', nullable: true })
  pushToken!: string | null;

  @Column({ type: 'boolean', default: true })
  enabled!: boolean;
}
