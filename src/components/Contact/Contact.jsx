import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import css from './Contact.module.css';

export default function Contact ({ data: {id, name, number}, onDelete}) {
    return (
        <div className={css.wrap}>
            <div className={css.contact}>
                <div className={css.name}>
                    <FaUser/>
                    <p>{name}</p>
                </div>
                <div className={css.phone}>
                    <FaPhoneAlt/>
                    <p>{number}</p>
                </div>
            </div>
            <button className={css.delete} onClick={() => onDelete(id)}>
                Delete
            </button>
        </div>
    )
}