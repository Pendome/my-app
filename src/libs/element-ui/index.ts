import { ElButton, ElSelect, ElInput, ElCheckbox, ElRadio, ElSwitch, ElDatePicker, ElTimePicker, ElForm, ElFormItem } from 'element-plus'

const element = (app: any) => {
  app.component(ElButton.name, ElButton)
  app.component(ElSelect.name, ElSelect)
  app.component(ElInput.name, ElInput)
  app.component(ElCheckbox.name, ElCheckbox)
  app.component(ElRadio.name, ElRadio)
  app.component(ElSwitch.name, ElSwitch)
  app.component(ElDatePicker.name, ElDatePicker)
  app.component(ElTimePicker.name, ElTimePicker)
  app.component(ElForm.name, ElForm)
  app.component(ElFormItem.name, ElFormItem)
}
export default element
