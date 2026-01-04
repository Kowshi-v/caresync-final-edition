import React from 'react';
import { Heart, Shield, User, Stethoscope, FileText, Lock, Users, Eye, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SetDoctorDialog } from '@/components/dialog/setDoctorDialog';

export default function CareSync() {
  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-600 fill-red-600" />
            <div>
              <h1 className="text-xl font-bold text-red-600">Care Sync</h1>
              <p className="text-xs text-red-500">Your Health, Your Control</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <ConnectButton />
            <a href="#features" className="text-gray-700 hover:text-red-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition">How It Works</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-8 p-6 bg-red-600 rounded-full shadow-2xl">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-red-600 mb-4">Care Sync</h2>
          <p className="text-2xl text-gray-700 mb-4">Secure, Blockchain-Powered Healthcare Records Management</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take complete control of your medical records with our revolutionary platform. Share your data securely while maintaining privacy.
          </p>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-5xl">
          <Card className="border-2 border-red-100 hover:border-red-300 transition">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-red-600 rounded-xl w-fit">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-red-700">Patient Portal</CardTitle>
              <CardDescription>Take control of your medical records and access permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">Upload & store medical records securely</p>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">Complete control over access permissions</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">Grant access to specific doctors</p>
              </div>
              <Button className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white mt-6">
                <span>Continue as Patient</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 hover:border-red-300 transition">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-red-600 rounded-xl w-fit">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-red-700">Doctor Portal</CardTitle>
              <CardDescription>Access patient records with proper authorization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">Secure, encrypted access to records</p>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">View-only permissions (no downloads)</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                <p className="text-gray-700">Patient-authorized access only</p>
              </div>
              <SetDoctorDialog />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-red-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-4xl font-bold text-red-700 text-center mb-4">How It Works</h3>
          <p className="text-center text-gray-600 mb-16">Simple, secure, and seamless healthcare record management</p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <User className="mx-auto mb-3" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Create Account</h4>
              <p className="text-gray-600 text-sm">Sign up securely with Google</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <FileText className="mx-auto mb-3" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Upload Records</h4>
              <p className="text-gray-600 text-sm">Store documents securely</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <Users className="mx-auto mb-3" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Grant Access</h4>
              <p className="text-gray-600 text-sm">Choose who can view records</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                <Shield className="mx-auto mb-3" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Stay Secure</h4>
              <p className="text-gray-600 text-sm">Monitor access anytime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 border-red-200 bg-linear-to-br from-red-50 to-white">
            <CardContent className="pt-12 pb-12 text-center">
              <Heart className="mx-auto mb-6 w-16 h-16 text-red-600 fill-red-600" />
              <h3 className="text-3xl font-bold text-red-700 mb-4">Ready to Take Control?</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Join thousands of patients and healthcare providers who trust Care Sync for secure medical data management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Get Started as Patient
                </Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8">
                  Join as Doctor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer id="contact" className="bg-red-900 text-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 fill-white" />
                <div>
                  <h4 className="font-bold text-lg">Care Sync</h4>
                  <p className="text-sm text-red-200">Your Health, Your Control</p>
                </div>
              </div>
              <p className="text-red-100 text-sm leading-relaxed">
                Care Sync is revolutionizing healthcare data management with blockchain technology, giving patients complete control over their medical records.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://facebook.com/" className="hover:text-red-200 transition"><FaFacebook size={20} /></a>
                <a href="https://x.com/" className="hover:text-red-200 transition"><FaTwitter size={20} /></a>
                <a href="https://linkedin.com/" className="hover:text-red-200 transition"><FaLinkedin size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-red-100">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 shrink-0" />
                  <span>contact@caresync.health</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 shrink-0" />
                  <span>+1 (800) CARE-SYNC</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>123 Healthcare Ave<br />Medical District, CA 94123</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-red-100">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-red-200">
            <p>© 2026 Care Sync. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                End-to-End Encrypted
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}