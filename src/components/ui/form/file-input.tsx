import React, { FC, useCallback, useEffect } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

interface IFileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  mode?: 'update' | 'append';
  name: any;
}

const FileInput: FC<IFileInputProps> = (props) => {
  const { name, label = name, mode = 'update' } = props;
  const { register, unregister, setValue, watch } = useForm();

  const files: File[] = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      let newFiles =
        mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles];
      if (mode === 'append') {
        newFiles = newFiles.reduce((prev: any, file: any) => {
          const fo = Object.entries(file);
          if (
            prev.find((e: File) => {
              const eo = Object.entries(e);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              );
            })
          ) {
            return prev;
          } else {
            return [...prev, file];
          }
        }, []);
      }

      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
        htmlFor={name}
      >
        {label}
      </label>
      <div {...getRootProps()}>
        <input
          {...props}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          {...getInputProps()}
        />
        <div
          className={
            'w-full p-2 border border-dashed border-gray-900 ' +
            (isDragActive ? 'bg-gray-400' : 'bg-gray-200')
          }
        >
          <p className="text-center my-2">Choose Photo </p>

          {!!files?.length && (
            <div className="grid gap-1 grid-cols-4 mt-2">
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    <img
                      className="inline object-cover w-16 h-16 mr-2 rounded-full"
                      src={URL.createObjectURL(file)}
                      alt="Profile Photo"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FileInput;
