import Image from "next/image";
import { redirect } from 'next/navigation';
import LoginForm from '@/src/components/auth/login-form';

export default function Home() {
 return <LoginForm />;
}
