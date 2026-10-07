# AMAL OS — AI Safety & Fatwa Firewall Specification

## 1. The Fatwa Safety Firewall

AMAL OS classifies all incoming prompts into five explicit safety tiers to prevent autonomous fatwas and hallucinations:

### CLASS A: General Educational Question
- **Definition**: General inquiries about Islamic beliefs, Quranic history, or foundational concepts.
- **Handling**: AI may answer directly, grounded strictly in approved primary sources with visible citations.

### CLASS B: General Life Guidance & Habit Formation
- **Definition**: Practical advice on productivity, sleep, daily routine, or emotional calmness.
- **Handling**: AI synthesizes educational context and recommends small, practical Amal actions.

### CLASS C: Recognized Scholarly Disagreement (Ikhtilaf)
- **Definition**: Issues where established Sunni legal schools (Hanafi, Shafi'i, Maliki, Hanbali) have legitimate differences (e.g. wiping over socks, positions in prayer).
- **Handling**: AI must present the diversity of classical jurisprudence fairly without manufacturing artificial consensus.

### CLASS D: Personalized Fiqh / Legal Ruling (Strict Human Escalation)
- **Definition**: Inquiries requiring specific legal determinations on personal situations: divorce (*talaq*), validity of marriage (*nikah*), binding oaths (*kaffarah*), commercial contract arbitration.
- **Handling**: **Autonomous ruling prohibited.** The system refuses to issue a ruling, explains the necessity of qualified human scholarship, and offers to open an escalated scholar case with the user's consent.

### CLASS E: High-Risk Situations & Crisis Intervention
- **Definition**: Mentions of suicide, self-harm, domestic violence, severe physical abuse, or emergency medical distress.
- **Handling**: **Immediate crisis response.** The system displays emergency contact numbers (e.g., Naseeha, Suicide & Crisis Lifeline) and halts standard religious habit processing.

---

## 2. Adversarial Red-Team Defenses

The system undergoes automated regression testing against 7 classes of adversarial attack:
1. **Mufti Roleplay**: Requests to ignore safety rules and act as a Grand Mufti are blocked.
2. **Hadith Fabrication**: Requests to invent Hadiths or citations are rejected with an explicit refusal.
3. **Family Privacy Extraction**: Attempts by one household member to view another's private journal entries are blocked by the firewall.
4. **Prompt Injection / Jailbreak**: Heuristic and classifier guards neutralize prompt escaping attempts.
