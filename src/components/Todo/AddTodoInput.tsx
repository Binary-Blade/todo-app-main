import {FC} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from "../../store/themeStore.tsx";
import {ITodoInput, TodoSchema} from "../../models/todoModel.ts";

type AddTodoFormProps = {
    onAddTodo: (todoText: string) => void;
};

export const AddTodoInput:FC<AddTodoFormProps> = ({onAddTodo}) => {
    const { themeProps, checkIcon } = useThemeStore();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ITodoInput>({
        resolver: zodResolver(TodoSchema)
    });

    const onSubmit = (data: ITodoInput) => {
        onAddTodo(data.newTodo);
        reset();
    };

    return (
        <>
            <div className={`${themeProps.secondaryBg} h-14 flex flex-row items-center rounded-md`}>
                <form onSubmit={handleSubmit(onSubmit)} className='pl-5 flex flex-row items-center'>
                    <img src={checkIcon} className='w-6 h-6'  alt='Check icon'/>
                    <input
                        {...register('newTodo', { required: true })}
                        placeholder="Add a new task"
                        className={`ml-3 ${themeProps.secondaryBg}`}
                    />
                    <button type="submit" className="ml-2"></button>
                </form>
            </div>
            {errors.newTodo && <p className={"error-message"}>{errors.newTodo.message}</p>}
        </>
    );
};
