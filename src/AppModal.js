import React, { useEffect, useState } from "react";
import { useSite } from "./context/SiteContext";
import { Button, Modal, Checkbox } from "antd";
import alertify from "alertifyjs";
import TranslateHelper from "./helpers/translateHelper";

const AppModal = () => {
  const { products, setProducts } = useSite();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(false);
  const [image, setImage] = useState("");
  const [rule, setRule] = useState(true);

  const enabled = avatar && rule;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (enabled) {
      addTest();
      setIsModalOpen(false);

      alertify.success("Ürün başarıyla eklendi");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (avatar) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", function () {
        setImage(this.result);
      });
      fileReader.readAsDataURL(avatar);
    }
  }, [avatar]);

  const addTest = () => {
    // destruct
    setProducts([
      ...products,
      {
        id: Number(id),
        title: name,
        url: image,
      },
    ]);
  };


  return (
    <React.Fragment>
      <Button type="primary" onClick={showModal}>
        {TranslateHelper.translate("add_item")}
      </Button>
      <Modal
        title={TranslateHelper.translate("add_item")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !enabled }}
        okText={TranslateHelper.translate("save")}
      >
        <form>
          {TranslateHelper.translate("product_name")}
          <input
            placeholder={TranslateHelper.translate("product_name")}
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          {TranslateHelper.translate("product_value")}
          <input
            placeholder={TranslateHelper.translate("product_value")}
            type="text"
            min="0"
            defaultValue={id}
            onChange={(e) => setId(e.target.value)} //Todo validation
          />
          {TranslateHelper.translate("product_img")}
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
          <Checkbox checked={rule} onChange={(e) => setRule(e.target.checked)}>
            {TranslateHelper.translate("rules")}
          </Checkbox>
          {avatar && (
            <div>
              <h3>{avatar.name}</h3>
              {image && <img width="50%" src={image} alt="item" />}
            </div>
          )}
        </form>
      </Modal>
    </React.Fragment>
  );
};
export default AppModal;
