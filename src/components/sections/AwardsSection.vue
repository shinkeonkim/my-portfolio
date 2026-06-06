<script setup lang="ts">
import SectionTitle from '@/components/common/SectionTitle.vue'
import Card from '@/components/common/Card.vue'
import Tag from '@/components/common/Tag.vue'
import { awards, certifications, educations } from '@/data'

type AwardVariant = 'gold' | 'silver' | 'bronze' | 'merit'

function awardVariant(rank: string | undefined): AwardVariant {
  if (!rank) return 'merit'
  if (/금상|대상|최우수상|1등|1위|gold|一等/i.test(rank)) return 'gold'
  if (/은상|우수상|2등|2위|silver|二等/i.test(rank)) return 'silver'
  if (/동상|3등|3위|三等|bronze/i.test(rank)) return 'bronze'
  return 'merit'
}
</script>

<template>
  <section id="awards" class="container-page py-24">
    <SectionTitle
      eyebrow="Credentials"
      title="Awards · Certifications · Education"
      description="대회 수상, 자격증, 학력 등 성과 및 이력입니다"
    />

    <div class="mt-12 grid gap-10 lg:grid-cols-2">
      <div class="space-y-5">
        <h3 class="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          Awards
        </h3>
        <ol class="space-y-3">
          <li
            v-for="award in awards"
            :key="`${award.title}-${award.date}`"
            class="flex items-start gap-3 border-l border-[var(--color-border-subtle)] pl-4"
          >
            <span class="mt-0.5 font-mono text-xs text-[var(--color-text-muted)]">
              {{ award.date }}
            </span>
            <div class="space-y-1">
              <p class="text-sm font-medium text-[var(--color-text-primary)]">
                {{ award.title }}
                <Tag
                  v-if="award.rank"
                  :label="award.rank"
                  :variant="awardVariant(award.rank)"
                  class="ml-1"
                />
              </p>
              <p class="text-xs text-[var(--color-text-secondary)]">{{ award.organization }}</p>
              <p v-if="award.detail" class="text-xs text-[var(--color-text-muted)]">{{ award.detail }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="space-y-10">
        <div class="space-y-5">
          <h3 class="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Certifications
          </h3>
          <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <li
              v-for="cert in certifications"
              :key="cert.title"
              class="flex items-center justify-between rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] px-3 py-2 text-xs"
            >
              <span class="text-[var(--color-text-primary)]">{{ cert.title }}</span>
              <span class="font-mono text-[var(--color-text-muted)]">{{ cert.date }}</span>
            </li>
          </ul>
        </div>

        <div class="space-y-5">
          <h3 class="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Education
          </h3>
          <div class="space-y-3">
            <Card v-for="edu in educations" :key="edu.school">
              <h4 class="text-sm font-semibold text-[var(--color-text-primary)]">{{ edu.school }}</h4>
              <p v-if="edu.major || edu.degree" class="text-xs text-[var(--color-text-secondary)]">
                {{ edu.major }} {{ edu.degree ? `· ${edu.degree}` : '' }}
              </p>
              <p class="mt-1 font-mono text-xs text-[var(--color-text-muted)]">
                {{ edu.period.start }} → {{ edu.period.end ?? '재학 중' }}
              </p>
              <p v-if="edu.status" class="text-xs text-[var(--color-text-muted)]">{{ edu.status }}</p>
              <p v-if="edu.gpa" class="mt-1 text-xs text-[var(--color-text-secondary)]">
                GPA {{ edu.gpa.total }} / {{ edu.gpa.scale }}
                (전공 {{ edu.gpa.major }})
              </p>
              <ul v-if="edu.notes" class="mt-1 list-disc pl-4 text-xs text-[var(--color-text-secondary)]">
                <li v-for="note in edu.notes" :key="note">{{ note }}</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
