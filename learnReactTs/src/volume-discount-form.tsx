import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  DataTable,
  Text,
  Link,
  BlockStack,
  InlineStack,
  Box,
  Icon
} from '@shopify/polaris'
import { DeleteIcon } from '@shopify/polaris-icons'
import '@shopify/polaris/build/esm/styles.css'

interface DiscountOption {
  id: number
  title: string
  subtitle: string
  label: string
  quantity: number
  discountType: 'none' | 'percentage' | 'fixed'
  amount?: number
}

interface FormData {
  campaign: string
  title: string
  description: string
  options: DiscountOption[]
}

export default function VolumeDiscountForm() {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      campaign: 'Volume discount #2',
      title: 'Buy more and save',
      description: 'Apply for all products in store',
      options: [
        {
          id: 1,
          title: 'Single',
          subtitle: 'Standard price',
          label: '',
          quantity: 1,
          discountType: 'none'
        },
        {
          id: 2,
          title: 'Duo',
          subtitle: 'Save 10%',
          label: 'Popular',
          quantity: 2,
          discountType: 'percentage',
          amount: 10
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  })

  const watchOptions = watch('options')

  const handleAddOption = () => {
    const lastOption = watchOptions[watchOptions.length - 1]
    append({
      id: lastOption.id + 1,
      title: '',
      subtitle: '',
      label: '',
      quantity: lastOption.quantity + 1,
      discountType: 'none'
    })
  }

  const onSubmit = async (data: FormData) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const previewRows = watchOptions.map(option => [
    option.title,
    option.discountType === 'none' ? 'None' : 
    option.discountType === 'percentage' ? '%discount' : 
    'Discount / each',
    option.quantity?.toString() || '',
    option.amount ? 
      (option.discountType === 'percentage' ? `${option.amount}%` : `$${option.amount}`) : 
      '-'
  ])

  return (
    <Page fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BlockStack gap="400">
          <Box paddingBlockStart="400" paddingInlineStart="400">
            <Link url="#" monochrome removeUnderline>
              ← Back
            </Link>
          </Box>

          <Box paddingInline="400">
            <Text variant="headingLg" as="h1">Create volume discount</Text>
          </Box>

          <Layout>
            <Layout.Section>
              <BlockStack gap="400">
                <Card>
                  <Box padding="400">
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">General</Text>
                      <FormLayout>
                        <Controller
                          name="campaign"
                          control={control}
                          rules={{ required: 'Campaign name is required' }}
                          render={({ field }) => (
                            <TextField
                              label="Campaign"
                              {...field}
                              error={errors.campaign?.message}
                              autoComplete="off"
                            />
                          )}
                        />
                        <Controller
                          name="title"
                          control={control}
                          rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <TextField
                              label="Title"
                              {...field}
                              error={errors.title?.message}
                              autoComplete="off"
                            />
                          )}
                        />
                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              label="Description"
                              {...field}
                              multiline={2}
                              autoComplete="off"
                            />
                          )}
                        />
                      </FormLayout>
                    </BlockStack>
                  </Box>
                </Card>

                <Card>
                  <Box padding="400">
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Volume discount rule</Text>
                      {fields.map((field, index) => (
                        <Box
                          key={field.id}
                          padding="400"
                          background="bg-surface-secondary"
                          borderRadius="200"
                        >
                          <BlockStack gap="400">
                            <InlineStack align="space-between">
                              <Text as="span" fontWeight="bold">
                                OPTION {index + 1}
                              </Text>
                              {fields.length > 1 && (
                                <Button
                                  icon={<Icon source={DeleteIcon} />}
                                  onClick={() => remove(index)}
                                  tone="critical"
                                  variant="plain"
                                />
                              )}
                            </InlineStack>
                            <FormLayout>
                              <FormLayout.Group>
                                <Controller
                                  name={`options.${index}.title`}
                                  control={control}
                                  rules={{ required: 'Title is required' }}
                                  render={({ field }) => (
                                    <TextField
                                      label="Title"
                                      {...field}
                                      error={errors.options?.[index]?.title?.message}
                                      autoComplete="off"
                                    />
                                  )}
                                />
                                <Controller
                                  name={`options.${index}.subtitle`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      label="Subtitle"
                                      {...field}
                                      autoComplete="off"
                                    />
                                  )}
                                />
                                <Controller
                                  name={`options.${index}.label`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      label="Label (optional)"
                                      {...field}
                                      autoComplete="off"
                                    />
                                  )}
                                />
                              </FormLayout.Group>
                              <FormLayout.Group>
                              <Controller
  name={`options.${index}.quantity`}
  control={control}
  rules={{ 
    required: 'Quantity is required',
    validate: value =>value > 0 || 'Quantity must be greater than 0'
  }}
  render={({ field }) => (
    <TextField
      label="Quantity"
      type="number"
      {...field}
      value={field.value !== undefined ? String(field.value) : ''} // Đảm bảo giá trị là string
      onChange={(value) => field.onChange(value)} // Truyền giá trị trực tiếp
      error={errors.options?.[index]?.quantity?.message}
      autoComplete="off"
    />
  )}
/>
                                <Controller
                                  name={`options.${index}.discountType`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      label="Discount type"
                                      options={[
                                        { label: 'None', value: 'none' },
                                        { label: '% discount', value: 'percentage' },
                                        { label: 'Discount / each', value: 'fixed' }
                                      ]}
                                      {...field}
                                      onChange={(value) => {
                                        field.onChange(value)
                                        if (value === 'none') {
                                          setValue(`options.${index}.amount`, undefined)
                                        }
                                      }}
                                    />
                                  )}
                                />
<Controller
  name={`options.${index}.amount`}
  control={control}
  rules={{
    validate: (value, formValues) => {
      const discountType = formValues.options[index].discountType;
      if (discountType !== 'none') {
        if (!value) return 'Amount is required';
        if (value <= 0) return 'Amount must be greater than 0';
      }
      return true;
    }
  }}
  render={({ field }) => (
    watchOptions[index].discountType !== 'none' && (
      <TextField
        label="Amount"
        type="number"
        {...field}
        value={field.value !== undefined ? String(field.value) : ''} 
        onChange={(value) => field.onChange(value)}
        suffix={watchOptions[index].discountType === 'percentage' ? '%' : '$'}
        error={errors.options?.[index]?.amount?.message}
        autoComplete="off"
      />
    )
  )}
/>
                              </FormLayout.Group>
                            </FormLayout>
                          </BlockStack>
                        </Box>
                      ))}
                      <Button 
                        onClick={handleAddOption} 
                        tone="success"
                        variant="primary"
                        fullWidth
                      >
                        Add option
                      </Button>
                    </BlockStack>
                  </Box>
                </Card>

                <Box paddingBlockEnd="400">
                  <Button submit variant="primary" tone="success">
                    Save
                  </Button>
                </Box>
              </BlockStack>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h2">Buy more and save</Text>
                      <Text as="p" tone="subdued">Apply for all products in store</Text>
                    </BlockStack>
                    <DataTable
                      columnContentTypes={['text', 'text', 'numeric', 'text']}
                      headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
                      rows={previewRows}
                    />
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </form>
    </Page>
  )
}

