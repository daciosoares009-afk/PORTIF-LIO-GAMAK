import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { whatsappUrl } from '../config/company'
import { services } from '../data/content'

type FieldName = 'name' | 'phone' | 'email' | 'service' | 'message'
type FormErrors = Partial<Record<FieldName, string>>

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function ContactForm() {
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState('')
  const [preparing, setPreparing] = useState(false)

  const clearError = (field: FieldName) => setErrors(current => ({ ...current, [field]: undefined }))

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const values = Object.fromEntries(form.entries()) as Record<FieldName, string>
    const nextErrors: FormErrors = {}

    if (values.name.trim().length < 2) nextErrors.name = 'Informe seu nome.'
    if (values.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Informe um telefone válido com DDD.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Informe um e-mail válido.'
    if (!values.service) nextErrors.service = 'Selecione o tipo de serviço.'
    if (values.message.trim().length < 10) nextErrors.message = 'Descreva sua necessidade com pelo menos 10 caracteres.'

    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0] as FieldName | undefined
    if (firstInvalid) {
      formElement.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      setStatus('Revise os campos destacados antes de continuar.')
      return
    }

    const message = `Olá, GAMAK! Meu nome é ${values.name}. Gostaria de solicitar uma avaliação para ${values.service.toLowerCase()}. Telefone: ${values.phone}. E-mail: ${values.email}. ${values.message}`
    setPreparing(true)
    setStatus('As informações foram organizadas. Conclua o envio na conversa do WhatsApp que será aberta.')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setPreparing(false), 650)
  }

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value))
    clearError('phone')
  }

  const fieldProps = (name: FieldName) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onInput: () => clearError(name),
  })

  return (
    <form className="contact-form reveal" onSubmit={submit} noValidate aria-busy={preparing}>
      <div className="form-intro"><span>Solicitação de avaliação</span><small>Etapa única · conclusão pelo WhatsApp</small></div>
      <div className="field-row">
        <label>Nome completo<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" {...fieldProps('name')} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</label>
        <label>Telefone<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={handlePhone} placeholder="(00) 00000-0000" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}</label>
      </div>
      <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" {...fieldProps('email')} />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</label>
      <label>Tipo de serviço<select name="service" defaultValue="" {...fieldProps('service')}><option value="" disabled>Selecione uma opção</option>{services.map(service => <option key={service.title}>{service.title}</option>)}</select>{errors.service && <span className="field-error" id="service-error">{errors.service}</span>}</label>
      <label>Mensagem<textarea name="message" rows={5} placeholder="Descreva brevemente sua necessidade e o tipo de ambiente." {...fieldProps('message')} />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</label>
      <button className="button form-submit" type="submit" disabled={preparing}>{preparing ? 'Preparando conversa…' : 'Continuar pelo WhatsApp'} <Send /></button>
      {status && <p className="form-status" role="status">{status}</p>}
      <small className="privacy-note">Nenhuma mensagem é enviada automaticamente. Você revisará o texto antes de enviar no WhatsApp.</small>
    </form>
  )
}
