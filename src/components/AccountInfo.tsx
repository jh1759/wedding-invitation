import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Accordion } from './ui/Accordion'
import { Button } from './ui/Button'
import { Toast } from './ui/Toast'
import { sampleData } from '../data/sample'

export function AccountInfo() {
  const { accounts } = sampleData
  const [showToast, setShowToast] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }

  return (
    <>
      <section className="section-padding" style={{ backgroundColor: 'rgba(255, 249, 246, 0.5)' }}>
        <div className="container-max">
          <h2 className="text-3xl sm:text-4xl font-display font-light text-center mb-16 text-brand-ink tracking-wide">
            마음 전하실 곳
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {accounts.map((account, index) => {
              const accountText = `${account.bank} ${account.number} ${account.name}`

              return (
                <Accordion key={index} title={account.title} defaultOpen={index === 0}>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-brand-primary/10">
                        <span className="text-sm text-brand-ink/60 tracking-wide">예금주</span>
                        <span className="font-medium text-brand-ink">{account.name}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-brand-primary/10">
                        <span className="text-sm text-brand-ink/60 tracking-wide">은행</span>
                        <span className="font-medium text-brand-ink">{account.bank}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-brand-ink/60 tracking-wide">계좌번호</span>
                        <span className="font-medium font-mono text-brand-ink">{account.number}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(accountText)}
                      className="w-full border-brand-primary/30 text-brand-ink hover:bg-brand-primary/10"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      계좌번호 복사
                    </Button>
                  </div>
                </Accordion>
              )
            })}
          </div>
        </div>
      </section>

      <Toast
        message="계좌번호가 복사되었습니다"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

