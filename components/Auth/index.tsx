import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import styles from "./index.module.scss";
import { Toast } from "@/components/Toast";
import { useRouter } from "next/navigation";

type FormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {
        const response = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        if (response?.ok) {
            Toast("success", "로그인에 성공하였습니다.", () =>
                router.push("/landing"),
            );
        } else if (response?.error) {
            Toast("error", "로그인에 실패하였습니다.");
        }
    });

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="ID">ID</label>
                <input
                    {...register("email", { required: true })}
                    type="string"
                    placeholder="이메일"
                />
                {errors.email && <p>email is required</p>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password">PW</label>
                <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="비밀번호 (6글자 이상)"
                    autoComplete="off"
                />
                {errors.password && <p>Password is required</p>}
            </div>
            <Button type="submit" skin={"green"}>
                로그인
            </Button>
        </form>
    );
};
export default SignIn;
