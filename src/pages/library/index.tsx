import React, {useEffect, useState} from 'react';
import useStorage from "@/hooks/useStorage";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    IconButton,
    Typography
} from "@material-tailwind/react";
import {PlusIcon} from "@heroicons/react/24/solid";
import {useForm} from "react-hook-form";
import useGenres from "@/hooks/useGenres";
import useOperatingSystems from "@/hooks/useOperatingSystems";
import MultiSelect from "@/components/MultiSelect";
import FormItem from "@/components/FormItem";
import UploadButton from "@/components/UploadButton";

type GameFormValues = {
    catalogImage: File[];
    headerImage: File[];
    screenshots: File[];
    pageUrl: string;
    title: string;
    description: string;
    shortDescription: string;
    genres: string[];
    operatingSystems: string[];
    releaseDate: string;
    price: number;
};

const Library = () => {
    const [storage] = useStorage();
    const role = storage?.user?.role;
    const [open, setOpen] = useState(false);
    const [isCatalogImageSelected, setCatalogImageSelected] = useState(false);
    const [isHeaderImageSelected, setHeaderImageSelected] = useState(false);
    const [areScreenshotsSelected, setScreenshotsSelected] = useState(false);
    const [genres, setGenres] = useState([]);
    const [operatingSystems, setOperatingSystems] = useState([]);

    const {getGenres} = useGenres();
    const {getOperatingSystems} = useOperatingSystems();

    useEffect(() => {
        getGenres().then((data) => setGenres(data));
        getOperatingSystems().then((data) => setOperatingSystems(data));
    }, []);


    const handleOpen = () => setOpen((cur) => !cur);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<GameFormValues>({
        defaultValues: {
            catalogImage: [],
            headerImage: [],
            screenshots: [],
            pageUrl: '',
            title: '',
            description: '',
            shortDescription: '',
            genres: [],
            operatingSystems: [],
            releaseDate: '',
            price: 0,
        },
    });

    const onSubmit = (data: GameFormValues) => {
        // Enviar dados do formulário para o servidor
        console.log(data);
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof GameFormValues) => {
        const fileList = event.target.files;
        const filesArray = Array.from(fileList);

        if (filesArray.length > 0) {
            setValue(field, filesArray);

            if (field === 'catalogImage') {
                setCatalogImageSelected(true);
            } else if (field === 'headerImage') {
                setHeaderImageSelected(true);
            } else if (field === 'screenshots') {
                setScreenshotsSelected(true);
            }
        }
    };

    const handleButtonClick = (field: keyof GameFormValues) => {
        const inputElement = document.getElementById(field) as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
        }
    };

    return (
        <div className="py-20 px-20 fixed z-10 w-full h-full">
            {role === 'Developer' ? (
                <>
                    <Badge color="green">
                        <IconButton onClick={handleOpen}>
                            <PlusIcon className="h-4 w-4"/>
                        </IconButton>
                    </Badge>
                    <Dialog
                        size="xl"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto w-full max-w-[50rem] bg-form-dark">
                            <CardHeader
                                variant="gradient"
                                color="blue"
                                className="mb-4 grid h-28 place-items-center"
                            >
                                <Typography variant="h3" color="white">
                                    Game registration
                                </Typography>
                            </CardHeader>
                            <CardBody
                                className="flex flex-col gap-4 h-[40rem] overflow-scroll overflow-x-hidden">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-y-6">
                                        <div className="flex flex-row justify-between">
                                            <UploadButton register={register('catalogImage')}
                                                          name="catalogImage"
                                                          label="Upload Catalog Image"
                                                          onChange={handleFileInputChange}
                                                          onClick={handleButtonClick}
                                                          changeColor={isCatalogImageSelected}/>

                                            <UploadButton register={register('headerImage')}
                                                          name="headerImage"
                                                          label="Upload Header Image"
                                                          onChange={handleFileInputChange}
                                                          onClick={handleButtonClick}
                                                          changeColor={isHeaderImageSelected}/>

                                            <UploadButton register={register('screenshots')}
                                                          name="screenshots"
                                                          label="Upload Screenshots"
                                                          onChange={handleFileInputChange}
                                                          onClick={handleButtonClick}
                                                          changeColor={areScreenshotsSelected}
                                                          multiple
                                            />
                                        </div>
                                        {errors.catalogImage || errors.headerImage || errors.screenshots ? (
                                            <Typography
                                                variant="small"
                                                color="red"
                                                className="mb-4 font-medium"
                                            >
                                                This is a required field
                                            </Typography>) : null}
                                        <FormItem register={register('pageUrl', {required: true})}
                                                  errors={errors.pageUrl} name="pageUrl" label="Page URL" type="text"
                                                  placeholder="game-url-example"/>
                                        <FormItem register={register('title', {required: true})} errors={errors.title}
                                                  name="title" label="Title" type="text"/>
                                        <FormItem register={register('description')}
                                                  errors={errors.description}
                                                  name="description" label="Description" type="text"/>
                                        <FormItem register={register('shortDescription',)}
                                                  errors={errors.shortDescription}
                                                  name="shortDescription" label="Short Description" type="text"/>
                                        <MultiSelect register={register('genres', {required: true})} setValue={setValue}
                                                     data={genres}
                                                     placeholder="Select a Genre" valueName="genres"
                                                     errors={errors.genres} label="Genre"/>
                                        <MultiSelect register={register('operatingSystems', {required: true})}
                                                     setValue={setValue}
                                                     data={operatingSystems} placeholder="Select a Operating System"
                                                     valueName="operatingSystems" errors={errors.operatingSystems}
                                                     label="Operating System"/>
                                        <FormItem register={register('releaseDate', {required: true})}
                                                  errors={errors.releaseDate} name="releaseDate" label="Release Date"
                                                  type="date"/>
                                        <FormItem register={register('price', {required: true})} errors={errors.price}
                                                  name="price" label="Price" type="number"/>
                                    </div>
                                </form>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button variant="gradient" onClick={handleSubmit(onSubmit)} fullWidth>
                                    Register
                                </Button>
                            </CardFooter>
                        </Card>
                    </Dialog>
                </>
            ) : null}
        </div>
    )
}
export default Library;
