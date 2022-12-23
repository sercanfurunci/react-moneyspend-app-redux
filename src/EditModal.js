import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "./store/actions/actions";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditModal({ oldPhoto }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [previewTitle, setPreviewTitle] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  const formSubmitHandler = () => {
    dispatch(
      editProduct({
        id: oldPhoto.id,
        price: Number(id),
        title: name,
        url: imageInfos.src,
      })
    );
    setIsModalOpen(false);
  };

  const onChange = async ({ fileList, file }) => {
    if (file instanceof File) {
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImageInfos({
            src: img.src,
          });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    }

    setImageList(fileList);
  };

  const onChangeId = (e) => {
    const result = e.target.value.replace(/\D/g, ""); //only get numbers
    setId(result);
  };

  return (
    <>
      <EditOutlined
        style={{ color: "green", float: "right", fontSize: "20px" }}
        onClick={showModal}
      />

      <Modal
        title={t("edit")}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          initialValues={{
            size: "large",
          }}
          size="large"
          onFinish={formSubmitHandler}
          validateMessages={{
            required: t("required"),
          }}
        >
          <Form.Item
            name="name"
            label={t("product_name")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              defaultValue={oldPhoto.title}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="id"
            label={t("product_value")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input defaultValue={oldPhoto.price} onChange={onChangeId} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="image"
            label={t("product_img")}
          >
            <Upload
              defaultFileList={oldPhoto.url}
              multiple={false}
              listType="picture-card"
              fileList={imageList}
              onChange={onChange}
              onPreview={handlePreview}
              beforeUpload={() => false}
            >
              {imageList.length < 1 && "+" + t("upload")}
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {t("update")}
            </Button>
          </Form.Item>
        </Form>
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={closePreview}
          title={previewTitle}
        >
          <img
            alt="img"
            style={{
              width: "50%",
            }}
            src={previewImage}
          />
        </Modal>
      </Modal>
    </>
  );
}
